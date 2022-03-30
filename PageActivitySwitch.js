function PagesActivity(activePage = 0) {
    const pages = document.querySelectorAll('a')

    pages[activePage].classList.add('active')
    
    for(const page of pages) {
        page.addEventListener('click', ()=> {
            clearActive()

            page.classList.add('active')
        })
    }

    function clearActive() {
        pages.forEach((page) => {
            page.classList.remove('active')
        })
    }
}

PagesActivity(0)