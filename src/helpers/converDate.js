export function convertDate(dateString) {
    // Replace slashes ("/") with hyphens ("-")
    let dateWithHyphens = dateString.replace(/\//g, '-');
    // Replace comma (",") with underscore ("_")
    let dateWithHyphensAndUnderscore = dateWithHyphens.replace(/,/g, '_');
    return dateWithHyphensAndUnderscore;
}