
showNotes();
// use adds a note

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click",function(e){
	let addtxt = document.getElementById("addtxt");
	let notes = localStorage.getItem("notes");
	let addtitle = document.getElementById("title");


	if(notes == null)
	{
		noteObj = [];
	}else{
		noteObj = JSON.parse(notes);
	}
	if (addtitle.value || addtxt.value) {
	  let myobj = {
		   title:addtitle.value,
		   text:addtxt.value
	   }
    
	noteObj.push(myobj);
	localStorage.setItem("notes",JSON.stringify(noteObj));
	addtxt.value = "";
	addtitle.value = "";
	console.log(noteObj);
    	showNotes();
    }
    else{
    	alert("Enter Some Notes Before Adding.");
    }

});


// fuction to show notes from local storage

function showNotes(){
	let notes = localStorage.getItem("notes");
	let colors = ["#446484","#bdbd26","green","#248e84","blue","purple","red"];
	if(notes == null)
	{
		noteObj = [];
	}else{
		noteObj = JSON.parse(notes);
	}
	let html = "";
	// notesObj.foreach(function(element,index){
		for (var i = 0;  i < noteObj.length; i++) {

			html += `<div class="noteCard card my-2 mx-2" style="width: 18rem; border: 2px solid ${colors[i]};
			            ">
                   <div class="card-body">
                     <h5 class="card-title">${noteObj[i].title}</h5>
                     <p class="card-text">${noteObj[i].text}</p>
                     <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                   </div>
                 </div>`;
			
		}

	let notesElm = document.getElementById('notes');
	if(noteObj.length != 0){
		notesElm.innerHTML = html;
	}
	else{
		notesElm.innerHTML = `Nothing to Show.  <strong> Add note</strong> to see any note.`
	}
}

//fuction to  delete note
function deleteNote(index){
	console.log("i m deleteing", index);
	let notes = localStorage.getItem("notes");
	if(notes == null)
	{
		noteObj = [];
	}else{
		noteObj = JSON.parse(notes);
	}

	noteObj.splice(index, 1);
	localStorage.setItem("notes",JSON.stringify(noteObj));
	showNotes();
}

let searchtxt = document.getElementById('searchtxt');
searchtxt.addEventListener("input",function(){

	let inputVal = searchtxt.value.toLowerCase();
	let noteCards = document.getElementsByClassName('noteCard');

	for (var i = 0; i < noteCards.length; i++) {
		let cardtxt = noteCards[i].getElementsByTagName("p")[0].innerText.toLowerCase();
		let cardtxt1 = noteCards[i].getElementsByTagName("h5")[0].innerText.toLowerCase();
		if(cardtxt.includes(inputVal) || cardtxt1.includes(inputVal)){
			noteCards[i].style.display = "block";
		}
		else{
			noteCards[i].style.display = "none";
		}
	}
});
