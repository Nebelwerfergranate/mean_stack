"use strict";

import _ from "lodash";
import angular from "angular";


const todoFactory = angular.module("app.todoFactory", []).factory("todoFactory", ($http) => {
    function getTasks($scope) {
        $http.get("/todos").success(response => {
            $scope.todos = response.todos;
        });
    }

    function createTask($scope){
        var taskIsEmpty = $scope.createTaskInput == null || $scope.createTaskInput === "";

        if(taskIsEmpty){
            return;
        }

        $http.post("/todos", {
            task: $scope.createTaskInput,
            isCompleted: false,
            isEditing: false
        }).success(response => {
            console.log(response);

            getTasks($scope);
            $scope.createTaskInput = "";
        });
    }

    function updateTask($scope, todo){
        $http.put(`/todos/${todo._id}`, {
            task: todo.updatedTask
        }).success(
            response => {
                console.log(response);

                getTasks($scope);
                todo.isEditing = false;
            }
        );
    }

    function deleteTask($scope, todoToDelete){
        $http.delete(`/todos/${todoToDelete._id}`).success(
            response => {
                console.log(response);

                getTasks($scope);
            }
        );
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
        getTasks,
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