const changeProjectHeadingTitle = (title) => {
    const projectTitle = document.querySelector(".heading-title");

    if(typeof title === 'string'){
        projectTitle.textContent = title;
    }else {
        console.error("Your argument is not string!")
    }

}

changeProjectHeadingTitle("Javascript is Cool")

