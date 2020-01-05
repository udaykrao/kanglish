export interface Favorite {
    english: string;
    kannada: string;
    rank: number;
};

const endpoint = 'https://9iepa55a3m.execute-api.us-east-1.amazonaws.com/Prod';

// From https://stackoverflow.com/questions/260749/what-is-the-best-way-to-get-and-set-a-single-cookie-value-using-javascript
function getToken(): string|undefined {
    const token = (document.cookie + ';').match(new RegExp('token=.*;'));
    if (token === null) {
        return undefined;
    }
    return token[0].split(/=|;/)[1];
}

export async function authenticate(pass: string): Promise<string|undefined> {
    return fetch(`${endpoint}/authenticate`, {
        method: 'POST',
        body: JSON.stringify({ pass }),
    })
    .then(resp => resp.json())
    .then(resp => {
        if (resp.token === undefined) {
            return undefined;
        }
        // store as cookie?
        document.cookie = `token=${resp.token}`
        return resp.token;
    })
    .catch(() => undefined);
}
export async function isAuthenticated(): Promise<boolean> {
    return fetch(`${endpoint}/authenticate`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    })
    .then(resp => resp.json())
    .then(resp => resp.isValid)
    .catch(() => undefined);
}

export async function getFavorites(): Promise<Favorite[]> {
    return fetch(`${endpoint}/favorites`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).then(resp => resp.json());
}

export async function deleteFavorite(fav: Favorite): Promise<Response> {
    return fetch(`${endpoint}/favorites`, {
        method: 'DELETE',
        body: JSON.stringify(fav),
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

export async function createFavorite(fav: Favorite): Promise<Response> {
    return fetch(`${endpoint}/favorites`, {
        method: 'POST',
        body: JSON.stringify(fav),
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
}

export async function reorderFavorite(fav: Favorite, newRank: number): Promise<Favorite[]> {
    return fetch(`${endpoint}/favorites`, {
        method: 'PATCH',
        body: JSON.stringify({ oldRank: fav.rank, newRank }),
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    }).then(() => getFavorites());
}

export async function translate(english: string): Promise<string> {
    return Promise.resolve(english.toLocaleUpperCase());
}