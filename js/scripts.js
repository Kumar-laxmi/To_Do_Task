var taskInput = document.getElementsByTagName("input")[0]; //NewTask
var dueDate = document.getElementsByTagName("input")[1]; //New Task List Item
var taskDescription = document.getElementsByTagName("input")[2]; //New Task List Item
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("IncompleteTasks"); //IncompleteTasks
var completedTasksHolder = document.getElementById("CompletedTasks"); //CompletedTasks

//New Task List Item
var createNewTaskElement = function(taskString, taskdueDate, taskDescription) {
	console.log("Create a new task element...");
	console.log("Task Name: " + taskString + ", Task Due Date: " + taskdueDate + ", Task Description: " + taskDescription);

	//Create List Item
	var listItem = document.createElement("li");


	var innerlistItem = document.createElement("li");
	innerlistItem.classList.add("myDIV");

	//Create Accordion div
	var accordion = document.createElement("div");
	accordion.classList.add("hide");

	var accordionDate = document.createElement("div");
	accordionDate.classList.add("HideDate");
	var accordionDescription = document.createElement("div");
	accordionDescription.classList.add("HideDescription");

	//input (checkbox)
	var checkBox = document.createElement("input"); // checkbox
	//label
	var label = document.createElement("label");
	
	//button.delete
	var deleteButton = document.createElement("button");

	//Each element needs modifying

	checkBox.type = "checkbox";
	deleteButton.textContent = "Delete";
	deleteButton.setAttribute("class", "delete");

	label.textContent = taskString;
	accordionDate.textContent = "Due Date: " + taskdueDate;
	accordionDescription.textContent = "Description: " + taskDescription;

	//Each element needs appending in Inner List
	innerlistItem.appendChild(checkBox);
	innerlistItem.appendChild(label);
	innerlistItem.appendChild(deleteButton);

	// Accordion div needs appending in List Item
	accordion.appendChild(accordionDate);
	accordion.appendChild(accordionDescription);

	//Each element needs appending in Outer List
	listItem.appendChild(innerlistItem);
	listItem.appendChild(accordion);

	return listItem;
}

//Add a new task
var addTask = function() {
	console.log("Add task...");
	console.log("Task Name: " + taskInput.value + ", Task Due Date: " + dueDate.value + ", Task Description: " + taskDescription.value);
	//Create a new list item with the text from #NewTask:
	var listItem = createNewTaskElement(taskInput.value, dueDate.value, taskDescription.value);

	//Append listItem to incompleteTasksHolder
	incompleteTasksHolder.appendChild(listItem);

	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
	dueDate.value = "";
	taskDescription.value = "";
}


//Delete an existing task
var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	//Remove the parent list item from the ul
	ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
	console.log("Task complete...");
	//Append the task list item to the #CompletedTasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
	console.log("Task incomplete...");
	//Append the task list item to the #IncompleteTasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var deleteButton = taskListItem.querySelector("button.delete");


	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;

	//bind checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;
}

// var ajaxRequest = function() {
// 	console.log("AJAX request");
// }

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
//addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	//bind events to list item's children (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	//bind events to list item's children (taskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

