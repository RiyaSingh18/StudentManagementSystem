function fnPhotoChange() {
    var imageRef = document.querySelector('img');
    var fileRef = document.querySelector('[type=file]');
    var fileInfo = fileRef.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInfo);
    reader.onload = function () {
        var imageContent = reader.result;
        window.imageContent = imageContent;
        imageRef.setAttribute('src', imageContent);
    }
    reader.onerror = function () {

    }
}

function fnReg()
{
   var  nameRef=document.getElementById('name');
   var  rnoRef=document.getElementById('rno');
    var locRef=document.getElementById('loc');
   

    var name=nameRef.value;
    var rno=rnoRef.value;
    var loc=locRef.value;
    

    dataObj={
        "name":name,
        "rno":rno,
        "loc":loc,
        "photo":window.imageContent
    }
    
    
    var httpObj = new XMLHttpRequest();
    httpObj.open('post',"http://localhost:2020/users/reg-stu");
    httpObj.setRequestHeader('Content-Type','application/json');
    httpObj.send(JSON.stringify(dataObj));
    httpObj.onload =function(){
       var res = httpObj.responseText;
       res=JSON.parse(res);
       if(res.affectedRows>0)
       {
           fnGetStudents();
           alert('inserted successfully');
       }
   
    httpObj.onerror = function(){
        debugger;
        console.log(httpObj.responseText);
    }
}
}

function fnGetStudents() {
    var httpObj = new XMLHttpRequest();
    httpObj.open('get', 'http://localhost:2020/users/get-stu');
    httpObj.send();
    httpObj.onload = function() {
        var res = httpObj.responseText;
        res = JSON.parse(res);
        students = res;
        prepareTable(res);
    }
    httpObj.onerror = function() {
        debugger;
    }
}

function fnBodyLoad() {
    fnGetStudents();

    regBtnRef = document.getElementById('reg');
    nameRef = document.getElementById('name');
    rnoRef = document.getElementById('rno');
    locRef = document.getElementById('loc');
    imgRef=document.querySelector('.img-default');
    updateBtnRef = document.getElementById('update');
    updateBtnRef.style.display = 'none';
}

function prepareTable(data) {
    var trs = '';
    data.forEach(function (o, i) {
        debugger;
        trs = trs + "<tr><td>" + o.name + "</td><td>" + o.rno + "</td><td>" + o.loc + "</td><td><img  width=100 height=100 src=" + createImage(o.photo) + " /></td><td><input type=button value=edit onclick=fnEdit(" + o.rno + ") /></td><td><input type=button value=delete onclick=fnDelete("+o.rno+") /></td></tr>";
    })
    var tbl = "<table border=1px><tr><th>Name</th><th>Rno</th><th>Location</th><th>Photo</th><th>Edit</th><th>Delete</th></tr>" + trs + "</table>";
    document.getElementById('tbl-data').innerHTML = tbl;
}

function fnEdit(rno) {
    regBtnRef.style.display = 'none';
    updateBtnRef.style.display = 'block';
    rnoRef.setAttribute('disabled','disabled');
    var stdObj = student.find(function (o) {
        return o.rno == rno;
    })
    nameRef.value=stdObj.name;
    rnoRef.value=stdObj.rno;
    locRef.value=stdObj.location;
    window.imageContent=createImage(stdObj.photo);
    imgRef.setAttribute('src',createImage(stdObj.photo));
}

function createImage(photo) {
    return "data:image/png;base64" + (String.fromCharCode.apply(null, new Uint8Array(photo.data)));
}

function fnDelete(rno)
{
    var isOk=confirm('r u sure');
    if(isOk)
    {
        var httpObj=new  XMLHttpRequest();
        httpObj.open('get','http://localhost:2020/users/del-stu?rno='+rno);
        httpObj.send();
        httpObj.onload =function(){
           var res=httpObj.responseText;
           res=JSON.parse(res);
          if(res.affectedRows>0){
              alert('deleted successfully');
              fnGetStudents();
          }
        }
       
    }
    }
