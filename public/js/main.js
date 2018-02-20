$(document).ready(function () {

    document.getElementById('fileInput').onchange = function (e) {
        loadImage(
            e.target.files[0],
            function (img) {
                loadedImage = img;
            },
            {
                canvas: true,
                contain: true,
                maxWidth: 512,
                maxHeight: 512
            } // Options
        );
    };

    const socket = io();

    $('.overlay').width($('img').width());
    $('.overlay').height($('img').height());
    $('.ui-loader.ui-corner-all').remove();
    $("#image-gallery").on("taphold", (event) => {

        $("#myModal").modal();


        event.preventDefault();
    });

    $('#mark').click(() => {
        const ids = ['first', 'second', 'third', 'forth'];

        const data = {
            info: ids.map(i => $('#' + i).val()),
            position: {
                x: $('#mainContainer')[0].scrollLeft + $('#mainContainer').width() / 2,
                y: $('#mainContainer')[0].scrollTop + $('#mainContainer').height() / 2
            },
            image: loadedImage.toDataURL()
        };

        socket.emit('pointmark', data);

    });

});