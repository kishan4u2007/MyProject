window.onload = function(){
	//buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');

	// Form Fields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var address = document.getElementById('address');
	var city = document.getElementById('city');
	var email = document.getElementById('email');

	// Address Book Display
	var addBookDiv = document.querySelector('.addbook');

	//Create Storage Array
	var addressBook = [];

	//Event Listener
	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "block";

	});

	function jsonStructure (fullname, phone, address, city, email){
		//this is called construct the varibale
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.city = city;
		this.email = email;
	}

	//Cancel button Event Listener
	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

    //Invoking addToBook function
	AddBtn.addEventListener("click", addToBook);

	//event bubbling: we will add click event in whole div but delt spefic div
	addBookDiv.addEventListener("click", removeEntry);

	function addToBook(){
	   var isNull = fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' && email.value!='';
		 if(isNull) {
		 	var obj = new jsonStructure(fullname.value, phone.value, address.value, city.value, email.value);
			//add the content of the form to the array & localstore
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);

			//Hide form panel
			quickAddFormDiv.style.display = "none";

			//clear the form
			clearForm();

			//updating & displaying all records in the addressbook
			showAddressBook();

		} 
	}

	//e checking person click inside of Div
	function removeEntry(e) {
		//checking where person actully click
		if(e.target.classList.contains("delbutton")) {
			var remID = e.target.getAttribute("data-id");
			//Remove Json Entry from the Array with the index num = remID
			addressBook.splice(remID, 1);
			//update localStorage or remove entry from localstorage as well
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}

	}

	function clearForm(){
		var frm = document.querySelectorAll('.formFields');
		for( var i in frm) {
			frm[i].value = '';
		}
	}

	function showAddressBook() {
		//check if the key 'addbook' exists in localStorage or else create it
		//if exits load content form localstorage and loop > display it on a page
		if(localStorage['addbook'] === undefined) {
			//if there is nothing inside of localStrage we intialize it with empty array
			localStorage['addbook'] = '[]';
		}else {
			addressBook = JSON.parse(localStorage['addbook']);
			addBookDiv.innerHTML = '';
			//this is loop for showing content
			for (n in addressBook) {
				var str = '<div class="entry">';
					str +='<div class="name"><p>' + addressBook[n].fullname + ' </p></div>';
					str +='<div class="email"><p>' + addressBook[n].email + ' </p></div>';
					str +='<div class="phone"><p>' + addressBook[n].phone + ' </p></div>';
					str +='<div class="address"><p>' + addressBook[n].address + ' </p></div>';
					str +='<div class="city"><p>' + addressBook[n].city + ' </p></div>';
					str +='<div class="del"><a href="#" class="delbutton" data-id="'+ n +'">Delete</a></div>';
					str +='</div>';
					addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();
}


//localStrage only store string 
//parse mean process go line by line