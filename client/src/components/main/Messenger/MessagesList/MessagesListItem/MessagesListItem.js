import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

import { apiUrl } from '../../../../../config';
import { getFileType } from '../../../../../util/file';

export default props => {
    const right = parseInt(props.memberId) === parseInt(props.userId) ? '' : 'r';
    const fileType = getFileType(props.filePath);
    return (
        <li>
            <div className={`message-box ${right}`}>
                <div className='sender-name'>
                    <p>
                        {props.senderName}
                    </p>
                </div>
                {props.message 
                    ?
                        <div className="message-text">
                            <p>
                                {props.message}
                            </p>
                        </div>
                    : ''
                }
                {props.filePath
                    ?
                    <div className="message-text file">
                        {
                            fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' ?
                                <img src={`${apiUrl}/${props.filePath}`} alt='file' /> :
                                <a href={`${apiUrl}/${props.filePath}`} download>
                                    File download <FontAwesomeIcon icon={faFileDownload} />
                                </a>
                        }
                    </div>
                    : ''
                }
            </div>
        </li>
    );
}