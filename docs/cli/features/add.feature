Feature: dd-todo action
	In order to organize my list
	As a logged in user
	I want to be be able to create new todo lists

Background: The user has install the dd-todo
	Given I install the dd-todo

Scenario: Adding a todo list
	When I run 'dd-todo add "Hello World"'
	Then The command is successful

Scenario: Listing the todos
	When I run 'dd-todo list'
	Then The command is successful
  And I see "Hello World"
