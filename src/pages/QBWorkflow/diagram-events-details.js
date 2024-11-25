export function getEventDetails(args) {
    let listView = document.getElementById('listview-def');
    if (listView && listView.ej2_instances) {
        let listViewComponent = listView.ej2_instances[0];
        let selectedItems = listViewComponent.getSelectedItems();
        if (selectedItems.data.length > 0) {
            let elementName = getName(selectedItems, args);
            if (elementName) {
                eventInformation(args);
            }
        }
    }
}
function getName(selectedItems, args) {
    for (let i = 0; i < selectedItems.data.length; i++) {
        let eventName = selectedItems.data[i].id;
        if (eventName === args.name) {
            return true;
        }
    }
    return false;
}
// tslint:disable-next-line:max-func-body-length
function eventInformation(args) {
    let span = document.createElement('span');
    span.innerHTML = 'Diagram ' + args.name.bold() + ' event called' + '<hr>';
    let log = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
}