import React, { memo } from 'react'
import Todoitem from './Todoitem';

function Content(props) {
    const { todos, handleRemove, markCompleted, handleEdit, status, sortTime, onFilterDate, onFilterStatus } = props;
    return (
        <div className="content">
            <div className="row m-1 p-3 px-5 justify-content-end">
                <div className="col-auto d-flex align-items-center">
                    <label className="text-secondary my-2 pr-2 view-opt-label">Filter</label>
                    <select className="custom-select custom-select-sm btn my-2 border-secondary mx-3"
                        value={status}
                        onChange={(e) => onFilterStatus(e.target.value)}
                    >
                        <option value="all" >All</option>
                        <option value="completed">Completed</option>
                        <option value="active">Active</option>
                    </select>
                </div>
                <div className="col-auto d-flex align-items-center px-1 pr-3">
                    <label className="text-secondary my-2 view-opt-label mx-3">Sort</label>
                    <select className="custom-select custom-select-sm btn my-2 border-secondary"
                        value={sortTime}
                        onChange={(e) => onFilterDate(e.target.value)}
                    >
                        <option value="added-date-asc" >DateUp</option>
                        <option value="due-date-desc">DateDown</option>
                    </select>
                </div>
            </div>
            <div className=" row mx-1 px-4 w-80">
                {todos.map((todo, index) => {
                    return <Todoitem
                        content={todo.content}
                        key={index}
                        index={index}
                        todo={todo}
                        handleRemove={handleRemove}
                        markCompleted={markCompleted}
                        handleEdit={handleEdit}
                        todos={todos}
                    />
                })}
            </div>
        </div>
    )
}

export default memo(Content)
