"use strict";

import angular from "angular";

const todoOnClickFactory = angular.module("app.todoOnClickFactory", []).factory("todoOnClickFactory", () => {

    function onCompletedClick(todo){
        todo.isCompleted = !todo.isCompleted;
    }

    function onEditClick(todo){
        todo.isEditing = true;
        todo.updatedTask = todo.task;
    }

    function onCancelClick(todo){
        todo.isEditing = false;
    }

    return {
        onCompletedClick,
        onEditClick,
        onCancelClick
    };
});

export default todoOnClickFactory;