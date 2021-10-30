import React from 'react';
import { DatePicker } from 'antd';
import { useState, useRef, useEffect } from 'react';

export const Header = (props) => {
    const { handleAdd, handleChageDate } = props;
    const [text, setText] = useState('');
    const AddTodo = () => {
        handleAdd(text);
        setText('')
    }

    const handleKeypress = (e) => {
        if (e.keyCode === 13) {
            AddTodo();
        }
    }

    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
    }, [])
    return (
        <div className="header row m-1 p-4" >
            <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
                <i className="fas fa-check bg-primary text-white rounded p-2 mx-2" ></i>
                <u>My Todo-s</u>
            </div>
            <div className="row m-1 p-3">
                <div className="col col-11 mx-auto">
                    <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                        <div className="col">
                            <input
                                className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                                type="text" placeholder="Add new .." autoFocus
                                value={text}
                                ref={inputRef}
                                onChange={e => setText(e.target.value)}
                                onKeyUp={handleKeypress}
                            />
                        </div>
                        <div className="col-auto m-0 px-2 d-flex align-items-center">
                            <DatePicker
                                onChange={handleChageDate}
                                onBlur={(e) => handleChageDate('')}
                            />
                        </div>
                        <div className="col-auto px-0 mx-0 mr-2">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={AddTodo}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}
