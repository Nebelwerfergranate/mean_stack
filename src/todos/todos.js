"use strict";

import _ from "lodash";

export default function($scope, todoFactory, todoOnClickFactory){
    let params = {
        createHasInput: false
    };

    //$scope.todos = [
    //    {
    //        task: "do dishes",
    //        isCompleted: false,
    //        isEditing: false
    //    },
    //    {
    //        task: "walk the dog",
    //        isCompleted: true,
    //        isEditing: false
    //    }
    //];

    todoFactory.getTasks($scope);

    const {onCompletedClick, onEditClick, onCancelClick} = todoOnClickFactory;

    $scope.onCompletedClick = _.partial(onCompletedClick);
    $scope.onEditClick = _.partial(onEditClick);
    $scope.onCancelClick = _.partial(onCancelClick);


    const {createTask, updateTask, deleteTask, watchCreateTaskInput} = todoFactory;

    $scope.createTask = _.partial(createTask, $scope);
    $scope.updateTask = _.partial(updateTask, $scope);
    $scope.deleteTask = _.partial(deleteTask, $scope);
    $scope.$watch("createTaskInput", _.partial(watchCreateTaskInput, params, $scope));

    // equivalently
    // $scope.createTask = todoFactory.createTask
    //.bind(this, $scope, params);
}