let outputFormat = null;
let file_name = null;
let resultFile;
let sourceImage = document.getElementById("source_image");
let compressedImage = document.getElementById("compressed_image");
let quality = 30;

function dataURLtoFile(dataurl, filename) {
 
 var arr = dataurl.split(','),
     mime = arr[0].match(/:(.*?);/)[1],
     bstr = atob(arr[1]), 
     n = bstr.length, 
     u8arr = new Uint8Array(n);
     
 while(n--){
     u8arr[n] = bstr.charCodeAt(n);
 }
 
 return new File([u8arr], filename, {type:mime});
}

function readFile(evt) {
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    sourceImage.src = event.target.result;
  };

  outputFormat = file.name.split(".").pop();
  file_name = file.name;
  reader.readAsDataURL(file);

  setTimeout(() => {
    compressedImage.src = jic.compress(sourceImage,quality,outputFormat).src;
    resultFile = dataURLtoFile(compressedImage.src,'image.png');
  }, 100)
  return false;
}

function submitData () {
  let formData = new FormData();
  formData.append('image', resultFile)

  // jika pakai laravel
  // $.ajaxSetup({
  //   headers: {
  //       'X-CSRF-TOKEN': '{{ csrf_token() }}'
  //   }
  // });

  $.ajax({
    url: "",
    processData: false,
    contentType: false,
    data: formData,
    type: 'POST',
    success: function(data){    
      // todo
    }
  })
}

$('#form').submit(function(e) {
  e.preventDefault()
  submitData()
})

document.getElementById("fileinput").addEventListener("change", readFile, false);
