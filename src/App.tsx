import React from 'react';
import EnglishInput from './EnglishInput';
import KannadaOutput from './KannadaOutput';
import {
  Favorite as FavoriteType,
  isAuthenticated,
  authenticate,
  createFavorite,
  deleteFavorite,
  getFavorites,
  translate
} from './api';
import Favorite from './Favorite';
import './App.css';
import Login from './Login';

interface AppState {
  text: string;
  kantext: string;
  favorites: FavoriteType[];
  initialLoading: boolean;
  favoriteLoading: boolean;
  translationLoading: boolean;
  isLoggedIn: boolean;
  badPassword: boolean;
}

class App extends React.Component<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      text: "",
      kantext: "",
      favorites: [],
      initialLoading: true,
      favoriteLoading: false,
      translationLoading: false,
      isLoggedIn: false,
      badPassword: false,
    };

    // start up the favorites!
    // check authentication...?
    isAuthenticated()
      .then(async isAuthed => {
        if (!isAuthed) {
          // get password from user
          this.setState({
            initialLoading: false,
            isLoggedIn: false,
          });
          return;
        } else {
          // We're logged in!
          this.setState({
            isLoggedIn: true,
          });
          // Get favorites
          return getFavorites()
            // Set our favorites
            .then(favs => this.setState({ favorites: favs }))
            // We've finished loading!
            .then(() => this.setState({ initialLoading: false }));
        }
    });
  } 

  private onInputChange = (text: string) => {
    this.setState({text});
  }

  private onLogin = (pass: string) => {
    this.setState({ initialLoading: true });
    authenticate(pass)
      .then(token => {
        if (token === undefined) {
          // bad password, get angry
          this.setState({
            initialLoading: false,
            isLoggedIn: false,
            badPassword: true,
          });
        } else {
          return getFavorites()
            .then(favs => this.setState({ favorites: favs }))
            .then(() => this.setState({
              initialLoading: false,
              isLoggedIn: true,
            }));
        }
      })
  }

  private onDelete = (english: string) => {
    const { favorites } = this.state;
    const ind = favorites.findIndex(f => f.english === english);
    if (ind === -1) {
      return;
    }
    this.setState({ favoriteLoading: true });
    deleteFavorite(favorites[ind])
      .then(() => {
        favorites.splice(ind, 1);
        this.setState({ favorites });
      })
      .then(() => this.setState({ favoriteLoading: false }));
  }

  private onCreate = () => {
    const { favorites, text, kantext } = this.state;
    this.setState({ favoriteLoading: true });
    const fav: FavoriteType = {
      english: text,
      kannada: kantext,
      rank: favorites.length,
    };
    createFavorite(fav)
      .then(() => {
        favorites.push(fav);
        this.setState({ favorites });
      })
      .then(() => this.setState({ favoriteLoading: false }))
  }

  public render() {
    const { text, kantext, initialLoading, favorites, isLoggedIn, badPassword } = this.state;
    if (initialLoading) {
      return <p>Loading...</p>;
    } else if (!isLoggedIn) {
      return <Login onSubmit={this.onLogin} isAngry={badPassword} />
    }
    const favs = favorites.map(fav => {
      return <Favorite key={fav.english} favorite={fav} onDelete={this.onDelete} />
    });
    return (
      <div className="kanglish">
        <h1>Welcome to Kanglish!</h1>
        <h2><em>Favorites</em></h2>
        <table className="fav-translations">
          <thead>
            <tr>
              <th></th>
              <th>English</th>
              <th>Kannada</th>
            </tr>
          </thead>
          <tbody>
            {favs}
          </tbody>
        </table>
        <div className="translator">
          <h2><em>Translate</em></h2>
          <EnglishInput 
            text={text}
            onChange={this.onInputChange}
            onKannadize={() => {
              translate(text)
                .then(kantext => this.setState({kantext}));
            }}  
          />
          <KannadaOutput kantext={kantext} onClick={this.onCreate} />
        </div>
      </div>  
    );
  }
}

export default App;
