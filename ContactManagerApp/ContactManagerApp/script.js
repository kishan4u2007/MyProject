angular.module('contactManagerApp',[]).
        controller('contactManagerCtrl',function($scope){

           function listContacts(){
              $scope.contacts=[{
              	'id':1,
              	'name':'Tarun',
              	'phone':'99999999'
              },
              {
              	'id':2,
              	'name':'Sanam',
              	'phone':'333333'
              },
              {
              	'id':3,
              	'name':'Nishant',
              	'phone':'324324324'
              }]

           }
           function reset(){
           	  $scope.contact={
          	
            }


            $scope.addContact=function(contact){
                $scope.contacts.push(contact);
                reset();
            };

            // $scope.delete=function(id){

            //    for(var i in $scope.contacts){
                 
            //      if(id==$scope.contacts[i].id){
            //      	$scope.contacts.splice(i,1);
            //      }
            //  }            

            // }

            $scope.delete=function(id){
            	console.log(id);
              $scope.contacts.splice(id,1);     

            };

            $scope.edit=function(id){
             $scope.contact=angular.copy($scope.contacts[id]);
            }                         

           }

           reset();
           listContacts();


        });