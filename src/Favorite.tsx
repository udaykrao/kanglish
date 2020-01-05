import React from 'react';
import { Favorite as FavoriteType } from './api';
import './Favorite.css';

interface FavoriteProps {
    favorite: FavoriteType;
    onDelete: (english: string) => unknown;
}

const Favorite: React.FC<FavoriteProps> = ({ favorite, onDelete }) => {
    return (
        <tr className="fav-record">
            <td>
            <button
                type="button"
                className="delete-record"
                onClick={() => onDelete(favorite.english)}
            >
                &times;
            </button>
            </td>
            <td>
            <p className="fav-english">{favorite.english}</p>
            </td>
            <td>
            <p className="fav-kannada">{favorite.kannada}</p>
            </td>
        </tr>
    );
};

export default Favorite;