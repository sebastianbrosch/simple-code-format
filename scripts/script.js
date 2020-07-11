$(document).ready(function() {

    //highlight the code on page load.
    $('pre code#code-formatted').each(function() {
        hljs.highlightBlock($(this).get(0));
    });

    //load the content of the textarea to the formatted area on every change.
    $('#code-input').on('input', function(e) {
        $('#code-formatted').text($(this).val());
        hljs.highlightBlock($('#code-formatted').get(0));
    });

    //button click event to download the code.
    $("button#image-download").click(function() {
        html2canvas($("#code-formatted").get(0)).then(canvas => {
            var itemHyperlink = document.createElement("a");
            itemHyperlink.href = canvas.toDataURL('image/png');
            itemHyperlink.setAttribute("download", 'code.png');
            itemHyperlink.click();
        });
    });
});