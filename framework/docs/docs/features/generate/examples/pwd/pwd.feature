Feature: pwd
	In order to print name of current/working directory
	As a user
	I want to print name of current/working directory

Background: The user in on a linux machine
	Given I am on a linux machine

Scenario: Adding a todo list
	When I run 'pwd'
	Then The command is successful
  And I see "/tmp"

