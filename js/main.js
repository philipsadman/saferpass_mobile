$(document).ready(function() {
	var singleContentWidth = $('.content').width();

	var contentsView = $('#contentsWrapper .contents');
	var contents = contentsView.find('.content');

	var addNewWrapper = $('#addNew');

	var currentPage = 0;
	var previousPage = null;

	hideControls('*');
	hideAddNew();

	$('.login-button').on('click', function() {

		showAccounts();
	});
	$('.add-new-button').on('click', function() {

		showAccounts();
	});

	$('#controls')
		.on('click', '.add-new-account', function() {
			showAddNew();
		})
		.on('click', '.back-to-prev', function() {
			showAccounts();
		});

	$('#accountsPage .accounts').on('click', '.account', function() {
		showAccount();
	});

	function showAccounts() {
		$('#header').find('.title').html('Accounts');

		hideAddNew();
		contentsView.css('marginLeft', -100 + '%');

		$('#controls').find('.back-to-prev').hide();
		$('#controls').find('.add-new-account').show();
		$('#controls').find('.search').show();
	}

	function showAccount() {
		currentPage = 2;

		hideAddNew();
		contentsView.css('marginLeft', -100 * 2 + '%');

		$('#controls').find('.add-new-account').hide();
		$('#controls').find('.back-to-prev').show();
	}

	function showAddNew() {
		addNewWrapper.css('top', 0);

		$('#controls').find('.back-to-prev').show();
		$('#controls').find('.add-new-account').hide();
		$('#controls').find('.search').hide();
	}
	function hideAddNew() {
		addNewWrapper.css('top', -addNewWrapper.height());
	}

	function hideControls(type) {
		if (type === '*') {
			$('#controls').find('.add-new-account').hide();
			$('#controls').find('.back-to-prev').hide();
			$('#controls').find('.search').hide();
		}
	}

	document.getElementById('accountsPage').ontouchmove = function( e ) {
	    e.stopPropagation();
	};

	// $('#accountsPage').on('scoll', function(e) {
	// 	$(window).scrollTop(0)
	// });

	// $(document).on('touchmove', function(e) {
	// 	if(!$(e.target).closest('.accounts').length) {
	// 		e.preventDefault();
	// 	}
	// });
});