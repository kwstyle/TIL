//$('.hamburger').click(function() {
//    $(this).toggleClass('hamburger--close');
//});

document.querySelector('.hamburger').addEventListener('click', function() {
    if(this.classList.contains('hamburger--close')) {
        alert('add');
        this.classList.remove('hamburger--close');
    } else {
        alert('remove');
        this.classList.add('hamburger--close');
    }
});