Feature: dd-frameword-docs 
	In order to generate the documentation
	As a user
	I want to be be able to run dd-frameword-docs

Background: The user has installed the dd-frameword-docs
	Given I am on a temporary directory
	Given I install dd-frameword-docs

Scenario: Generating 
	When I run 'dd-frameword-docs examples/pwd'
	Then The command is successful

Scenario: Listing the todos
	When I run 'dd-frameword-docs list'
	Then The command is successful
  And I see "Hello World"
