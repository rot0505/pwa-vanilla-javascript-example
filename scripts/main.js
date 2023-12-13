import VanillaRouter from './router.js'

const router = new VanillaRouter({
	type: 'history',
	routes: {
		'/': 'home',
		'/login': 'login',
		'/about': 'about',
		'/contact': 'contact',
		'/services': 'services',
		'/programs': 'programs',
	},
})

router.listen().on('route', async (e) => {

	window.scrollTo({ top: 0, behavior: 'smooth' })

	fetch('pages/' + e.detail.route + '.html').then((response) => response.text()).then((htmlData) => {

		document.getElementById('main-content').innerHTML = htmlData
		document.querySelectorAll('.menu ul li a').forEach(function (elem) {
			if (elem.href.endsWith(e.detail.route) || (elem.href.endsWith("/") && e.detail.route == 'main')) {
				elem.parentElement.classList.add('active')
			} else {
				elem.parentElement.classList.remove('active');
			}
		});
	}).catch(err => { console.log() })
})


document.addEventListener('DOMContentLoaded', init)

function init() {

	var btn_open = document.querySelector('.btn-menu')
	var menu = document.querySelector('.menu')

	btn_open.addEventListener('click', function () {
		if (btn_open.classList.contains('close')) {
			btn_open.classList.remove('close')
			menu.classList.remove('show')
		} else {
			btn_open.classList.add('close')
			menu.classList.add('show')
		}
	})

	document.querySelector('.menu').addEventListener('click', function (event) {
		if (event.target.tagName.toLowerCase() === 'a') {
			btn_open.classList.remove('close')
			menu.classList.remove('show')
		}
	})
}

if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
			.register("/scripts/serviceWorker.js")
			.then(res => console.log("service worker registered"))
			.catch(err => console.log("service worker not registered", err));
	});
}