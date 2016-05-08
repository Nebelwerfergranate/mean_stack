"use strict";

import _ from "lodash";
import angular from "angular";


const todoFactory = angular.module("app.todoFactory", []).factory("todoFactory", () => {
    function createTask($scope, params){
        params.createHasInput = false;
        $scope.createTaskInput = '';
    }

    function updateTask(todo){
        todo.task = todo.updatedTask;
        todo.isEditing = false
    }

    function deleteTask($scope, todoToDelete){
        _.remove($scope.todos, todo => todo.task === todoToDelete.task);
    }

    function watchCreateTaskInput(params, $scope, val){
        var newInputIsRequired = val !== "" && val != null && !params.createHasInput;
        var updateIsRequired = val !== "" && val != null && params.createHasInput;
        var inputRemovingIsRequired = (val === "" || val == null) && params.createHasInput;

        if(inputRemovingIsRequired){
            _removeInput(params, $scope);
        } else if(newInputIsRequired){
            _createInput(params, $scope, val);
        } else if(updateIsRequired){
            _updateInput($scope, val);
        }
    }

    return {
        createTask,
        updateTask,
        deleteTask,
        watchCreateTaskInput
    };

    function _removeInput(params, $scope){
        $scope.todos.pop();
        params.createHasInput = false;
    }

    function _createInput(params, $scope, val){
        $scope.todos.push({
            task: val,
            isCompleted: false
        });
        params.createHasInput = true;
    }

    function _updateInput($scope, val){
        $scope.todos[$scope.todos.length - 1].task = val;
    }
});

export default todoFactory;