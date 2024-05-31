var siteNameIndex = document.getElementById("sitename");
var siteUrlIndex = document.getElementById("siteurl");
var btnClick = document.getElementById("model");

var sitesContainer = [];

if (localStorage.getItem("sites") !== null) {
  sitesContainer = JSON.parse(localStorage.getItem("sites"));
  displaySites(sitesContainer);
}

function addFavoriteSites() {
  var sites = {
    sName: siteNameIndex.value,
    sUrl: siteUrlIndex.value,
  };

  if (validate(siteNameIndex) && validate(siteUrlIndex)) {
    sitesContainer.push(sites);
    localStorage.setItem("sites", JSON.stringify(sitesContainer));
    clearform();
    displaySites(sitesContainer);
  } else {
    btnClick.click();
  }
}

function clearform() {
  siteNameIndex.value = null;
  siteUrlIndex.value = null;
}

function displaySites(array) {
  var box = "";
  for (var i = 0; i < array.length; i++) {
    box += `<tr>
                <td scope="row">${i + 1}</td>
                <td>${array[i].sName}</td>
                <td>
                  <a href="${
                    array[i].sUrl
                  }" type="button" class="text-decoration-none btn btn-outline-success" target="_blank">
                  <i class="fa-solid fa-eye"></i> Visit </a>
                    
                </td> 
                <td>
                  <button type="button" onclick="deleteSite(${i})" class="btn btn-outline-danger">
                    <i class="fa-solid fa-trash-can"></i> Delete
                  </button>
                </td>
              </tr>`;
  }
  document.getElementById("favoritesites").innerHTML = box;
}

function deleteSite(deleteitem) {
  sitesContainer.splice(deleteitem, 1);
  localStorage.setItem("sites", JSON.stringify(sitesContainer));
  displaySites(sitesContainer);
}

function validate(element) {
  var regex = {
    sitename: /^([a-zA-Z0-9]{3,})$/,
    siteurl: /^((https|http):\/\/(www\.)[a-zA-Z0-9]*\.[a-zA-Z0-9(\/)?]*)$/,
  };

  // regex.sitename === regex["sitename"]

  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
