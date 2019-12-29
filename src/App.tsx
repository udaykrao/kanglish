import React from 'react';
import EnglishInput from './EnglishInput';
import KannadaOutput from './KannadaOutput';
import translate from './translate';
import logo from './logo.svg';
import './App.css';

interface AppState {
  text: string;
  kantext: string;
}
class App extends React.Component<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      text: "",
      kantext: "",
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  private onInputChange(text: string): void{
    this.setState({text});
  }
  public render() {
    const {text, kantext} = this.state;
    return (
      <div className="kanglish">
        <h1>Welcome to Kanglish!</h1>
        <EnglishInput 
          text={text}
          onChange={this.onInputChange}
          onKannadize={() => {
            translate(text)
              .then(kantext => this.setState({kantext}));
          }}  
        />
        <KannadaOutput kantext={kantext} />
      </div>  
    );
  }
}

export default App;
