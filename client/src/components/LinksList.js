import React from 'react';
import {Link} from 'react-router-dom';

export const LinksList = ({links}) => {

    if (!links.length) {
        return <p className='center'>There are no links yet</p>
    }

    return (
        <table className='highlight'>
            <thead>
            <tr>
                <th>№</th>
                <th>Original link</th>
                <th>Contracted link</th>
                <th>Follow</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{link.from}</td>
                    <td>{link.to}</td>
                    <td><Link to={`/detail/${link._id}`}>Follow</Link></td>
                </tr>
            ))}

            </tbody>
        </table>
    )

}