function removeCover() {
	document.getElementById("cover").style.display = "none";
	navigateTo();
}

function navigateTo(index = currentPosition) {
	if (index !== currentPosition) {
		currentPosition = index;
	}
  hideArrows();
  hideContent();
  updateBackground();
}

function hideArrows() {
  document.getElementById("navigation__left").style.display = "none";
	document.getElementById("navigation__right").style.display = "none";
	document.getElementById("step").style.display = "none";
}

function updateArrows() {
	document.getElementById("navigation__left").style.display = "block";
	document.getElementById("navigation__right").style.display = "block";
	document.getElementById("step").style.display = "block";
	if (currentPosition == 0) {
		document.getElementById("navigation__left").style.display = "none";
		document.getElementById("step").style.display = "none";
	}
	if (currentPosition == 9) {
		document.getElementById("navigation__right").style.display = "none";
		document.getElementById("step").style.display = "none";
	}
}

function hideContent() {
  var navigationPane = document.getElementsByClassName("pagination__list__item");
	for (var page = 0; page <= 9; page++) {
		document.getElementById("page" + page).style.display = "none";
		navigationPane[page].style.backgroundColor = "transparent";
	}
}

function showContent() {
  var navigationPane = document.getElementsByClassName("pagination__list__item");
	var path = document.getElementById("step");
	document.getElementById("page" + currentPosition).style.display = "block";
	navigationPane[currentPosition].style.backgroundColor = "white";
	step.innerText = "Step " + currentPosition + " out of 8 on the path to digital enlightenment";
}

function updateBackground() { 
  var priorBgPosition = ((priorPosition) * 12);
  var newBgPosition = ((currentPosition) * 12);
  modifier = 1;

  if (sliderActive) return;
  if (priorBgPosition > newBgPosition) modifier = -1;

  var timer = setInterval(function() {
    sliderActive = true;
    priorBgPosition = priorBgPosition + (sliderDiff * modifier);
    document.getElementById("container").style.backgroundPosition = priorBgPosition + "%";
    
    if (!((priorBgPosition < newBgPosition && modifier===1) || (priorBgPosition > newBgPosition && modifier ===-1))) {
      clearInterval(timer);
      showContent();
      updateArrows();
      priorPosition = currentPosition;
      sliderActive = false;
    }
  },4);

}

function navigateLeft() {
	if (currentPosition > 0) {
		currentPosition -= 1;
		navigateTo();
	}
}

function navigateRight() {
	if (currentPosition < 9) {
		currentPosition += 1;
		navigateTo(currentPosition);
	}
}

var sliderActive = false;
var sliderDiff = 0.11;
var modifier = 1;
var priorPosition = 0;
var currentPosition = 0;