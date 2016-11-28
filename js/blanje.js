$(document).ready(function () {
	$("#slide" + 1).show();
	$("#page" + 1).css("display", "flex");

	startSlider();
});


// Image Slider

sliderStarted = false;
currentSlide = 1;
nextSlide = 2;
imageCount = $("#image-slider > img").length;

$("#prev-slide").on("click", slidePrev);
$("#next-slide").on("click", slideNext);

// stops image slider animations to queue up when you switch tabs
$(window).on("focus", function () {
	if (sliderStarted == false) {
		startSlider();
	}
});
$(window).on("blur", stopSlider);

function startSlider() {
	if (sliderStarted == false) {

		loop = setInterval(function () {
			if (nextSlide > imageCount) {
				nextSlide = 1;
				currentSlide = imageCount;
			}

			$("#slide" + currentSlide).hide("slide", { direction: "left" }, 600);
			$("#slide" + nextSlide).show("slide", { direction: "right" }, 600);

			currentSlide = nextSlide;
			nextSlide = nextSlide + 1;
		}, 4000)
		sliderStarted = true;
	}
}

function stopSlider() {
	window.clearInterval(loop);
	sliderStarted = false;
}

function slidePrev() {
	$("#prev-slide").off();
	stopSlider();
	newSlide = currentSlide;

	if (newSlide == 1) {
		currentSlide = imageCount;
	} else {
		currentSlide = newSlide - 1;
	}

	$("#slide" + newSlide).hide("slide", { direction: "right" }, 600);
	$("#slide" + currentSlide).show("slide", { direction: "left" }, 600, function () {
		$("#prev-slide").on("click", slidePrev);
	});

	nextSlide = currentSlide + 1;
	startSlider();
}

function slideNext() {
	$("#next-slide").off();
	stopSlider();
	newSlide = currentSlide;

	if (newSlide == imageCount) {
		currentSlide = 1;
	} else {
		currentSlide = newSlide + 1;
	}

	$("#slide" + newSlide).hide("slide", { direction: "left" }, 600);
	$("#slide" + currentSlide).show("slide", { direction: "right" }, 600, function () {
		$("#next-slide").on("click", slideNext);
	});

	nextSlide = currentSlide + 1;
	startSlider();
}

$("#image-slider > img").hover(
	function () {
		stopSlider();
	},
	function () {
		startSlider();
	}
);


// Dynamic Navbar

navbarOffset = $("#navbar").offset().top;
isNavbarFixed = false;
isNavbarHovered = false;

$(window).scroll(function () {
	if ($(this).scrollTop() > navbarOffset) {
		$("#navbar").css({ "position": "fixed", "top": "0" });
		$("#menu").css("background-color", "rgba(80, 80, 80, 1)");
		$("#post-header").css("height", "400px");
		isNavbarFixed = true;
	} else {
		$("#navbar").css("position", "static");
		$("#menu").css("background-color", "rgba(23, 23, 23, 0.3)");
		$("#post-header").css("height", "340px");
		isNavbarFixed = false;
		$("#menu").css("opacity", "1");
	}
});

$("#menu").on("mouseenter", function () {
		$("#menu").css("opacity", "1");
		isNavbarHovered = true;
});

$("#menu").on("mouseleave", function () {
		isNavbarHovered = false;
});

$(window).on("click", function () {
	if (isNavbarFixed && !isNavbarHovered) {
		$("#menu").css("opacity", "0");
	}
});


// Smooth scroll

$("#go-pocetna").click(function (e) {
	e.preventDefault();
	var pocetna = $("#pocetna").offset().top;
	$("html, body").animate({ scrollTop: pocetna - 60 }, 300);
	isHoverHandled = true;
	isSlidedByClick = true;
	return false;
});
$("#go-vijesti").click(function (e) {
	e.preventDefault();
	var vijesti = $("#vijesti").offset().top;
	$("html, body").animate({ scrollTop: vijesti - 60 }, 300);
	isHoverHandled = true;
	isSlidedByClick = true;
	return false;
});
$("#go-galerija").click(function (e) {
	e.preventDefault();
	var galerija = $("#galerija").offset().top;
	$("html, body").animate({ scrollTop: galerija - 60 }, 300);
	isHoverHandled = true;
	isSlidedByClick = true;
	return false;
});
$("#go-o-nama").click(function (e) {
	e.preventDefault();
	var oNama = $("#o-nama").offset().top;
	$("html, body").animate({ scrollTop: oNama - 60 }, 300);
	isHoverHandled = true;
	isSlidedByClick = true;
	return false;
});
$("#go-kontakt").click(function (e) {
	e.preventDefault();
	var kontakt = $("#kontakt").offset().top;
	$("html, body").animate({ scrollTop: kontakt - 60 }, 300);
	isHoverHandled = true;
	isSlidedByClick = true;
	return false;
});


// Gallery pages

currentPage = 1;
pageCount = $(".container-gallery-images").length;

$("#prev-page").on("click", function () {
	prevPage();
});
$("#next-page").on("click", function () {
	nextPage();
});

function prevPage() {
	newPage = currentPage - 1;

	if (newPage >= 1) {
		$(".container-gallery-images").hide();
		$("#page" + newPage).css("display", "flex");

		currentPage = newPage;
		newPage = newPage - 1;
	}

	if (newPage > 0) {
		$("#prev-page h3").html("Stranica " + newPage);
		$("#prev-page h3").fadeIn(300);
	} else {
		$("#prev-page h3").fadeOut(300);
	}
	$("#next-page h3").fadeIn(300);
	$("#next-page h3").html("Stranica " + (currentPage + 1));
}

function nextPage() {
	newPage = currentPage + 1;

	if (newPage <= pageCount) {
		$(".container-gallery-images").hide();
		$("#page" + newPage).css("display", "flex");

		currentPage = newPage;
		newPage = newPage + 1;
	}

	if (newPage < (pageCount + 1)) {
		$("#next-page h3").html("Stranica " + newPage);
		$("#next-page h3").fadeIn(300);
	} else {
		$("#next-page h3").fadeOut(300);
	}
	$("#prev-page h3").fadeIn(300);
	$("#prev-page h3").html("Stranica " + (currentPage - 1));
}


// Gallery images

$(".container-image img").on("click", function () {
	getPictureId(this);
});

function getPictureId(picture) {
	pictureId = parseInt(picture.id);
	currentPicture = pictureId;
	pictureCount = $(".container-gallery-images img").length;
	console.log(currentPicture);

	$("#gallery-cover").fadeIn(500);
	$("#" + pictureId).clone().appendTo("#high-res-pictures").show();

	if (currentPicture > 1) {
		$("#prev-picture").fadeIn(300);
	}
}


$("#prev-picture").on("click", function () {
	imagePrev();
});
$("#next-picture").on("click", function () {
	imageNext();
});
$("#exit-picture").on("click", function () {
	$("#high-res-pictures img").fadeOut(500, function () {
		$("#high-res-pictures img").remove();
	});
	$("#gallery-cover").fadeOut(500);
});
$(document).on("keyup", function (e) {
	if (e.keyCode == 27) {
		imageExit();
	}
});


function imagePrev() {
	$("#prev-picture").off();
	nextPicture = currentPicture - 1;

	if (currentPicture >= 1) {
		$("#high-res-pictures img").hide("slide", { direction: "right" }, 600);
		$("#" + nextPicture).clone().appendTo("#high-res-pictures").show("slide", { direction: "left" }, 600, function () {
			$("#prev-picture").on("click", imagePrev);
		});
		currentPicture = nextPicture;
		nextPicture = nextPicture - 1;
	}

	if (nextPicture > 0) {
		$("#prev-picture").fadeIn(300);
	} else {
		$("#prev-picture").fadeOut(300);
	}
	$("#next-picture").fadeIn(300);
}

function imageNext() {

	$("#next-picture").off();
	nextPicture = currentPicture + 1;

	if (currentPicture <= pictureCount) {
		$("#high-res-pictures img").hide("slide", { direction: "left" }, 600);
		$("#" + nextPicture).clone().appendTo("#high-res-pictures").show("slide", { direction: "right" }, 600, function () {
			$("#next-picture").on("click", imageNext);
		});
		currentPicture = nextPicture;
		nextPicture = nextPicture + 1;
	}

	if (nextPicture < (pictureCount + 1)) {
		$("#next-picture").fadeIn(300);
	} else {
		$("#next-picture").fadeOut(300);
	}
	$("#prev-picture").fadeIn(300);
}

function imageExit() {
	$("#high-res-pictures img").fadeOut(500, function () {
		$("#high-res-pictures img").remove();
	});
	$("#gallery-cover").fadeOut(500);
}