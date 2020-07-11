$(document).ready(function() {
    SetCurrentLanguage();

    //highlight the code on page load.
    $('pre code#code-formatted').each(function() {
        ReloadCodeContent();
    });

    //load the content of the textarea to the formatted area on every change.
    $('#code-input').on('input', function(e) {
        ReloadCodeContent();
    });

    //get the language of the current selection after change.
    $('select#select-language').change(function() {
        SetCurrentLanguage();
        ReloadCodeContent();
    })

    //button click event to download the code.
    $("button#image-download").click(function() {
        html2canvas($("#code-formatted").get(0), {'logging': false}).then(canvas => {
            var itemHyperlink = document.createElement("a");
            itemHyperlink.href = canvas.toDataURL('image/png');
            itemHyperlink.setAttribute("download", 'code.png');
            itemHyperlink.click();
        });
    });
});

function ReloadCodeContent() {
    $('#code-formatted').text($('#code-input').val());
    hljs.highlightBlock($('pre code#code-formatted').get(0));
}
function SetCurrentLanguage() {
    $('pre code#code-formatted').attr('class', 'lang-' + ($('select#select-language').find('option:selected').val() || ''));
}