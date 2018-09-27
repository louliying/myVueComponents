
    /*
        //@para element  元素
        //@para type   事件类型
        //@para handler 绑定事件处理方法
        //给元素elem 绑定type类型的事件类型， 事件处理方法是handler
    */
    export default function addEvent (element, type, handler) {
        if (!handler.$$guid) {
            handler.$$guid = addEvent.guid ++;
        }
        if (!element.events) {
            element.events = {};
        }

        var handlers = element.events[type];
        if (!handlers) {
            handlers = element.events[type] = {};
            if (element['on' + type]) {
                handlers[0] = element['on' + type];
            }
        }
        handlers[handler.$$guid] = handler;
        element['on' + type] = handleEvent;
    };
    function handleEvent (event) {
        event = event || ((this.ownerDocument || this.document || this).parentWindow || window).event;

        var handlers = this.events[event.type];
        for (var i in handlers) {
            this.$$handleEvent = handlers[i];
            this.$$handleEvent(event);
        }
    };
