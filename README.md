pilot-e-application
===================

This is not the implementation of whole pilot e application anymore but only of serveral widgets, such as the capture wirecloud widget or several debriefing widgets, etc.

## Capture Widget

### Interface

```xml
    <Platform.Wiring>
        <InputEndpoint
            name="setWorldstate"
            type="text"
            label="Set Worldstate"
            description="Sets a worldstate (JSON-String, min level 3) to be displayed
                         or edited. However, if the widget is currently editing (see 
                         set/isEditing) it will prompt the user if he wants to discard
                         changes. If the user is positive about discard then the new
                         worldstate data is loaded and an 'isEditing' event with the
                         value 'false' is issued, otherwise the worldstate will remain
                         the old one and an 'isEditing' event with value 'false' is
                         issued. In case that the widget is not in editing mode and a
                         new worldstate is set and 'isEditing' event with the value
                         'false' is issued, too."
            friendcode="worldstate_json_expanded"/>
        <InputEndpoint
            name="setEditing"
            type="text"
            label="Set Editing"
            description="Toggle editing mode. If the provided value is 'true' the
                         widget will display a modal dialog asking for initial data,
                         such as exercise name (a.k.a. worldstate name), exercise 
                         description (a.k.a. worldstate description) and incident time.
                         If the user provides appropriate values and accepts his input
                         (answer 'OK') the widget will switch to editing mode. If the
                         user cancels entry of exercise data the widget does not enter
                         editing mode and issues an 'isEditing' event with the value
                         'false'.
                         If the provided value is 'false' and the widget is currently
                         in editing mode the widget will probably stop editing: The user
                         is asked if he wants to stop editing. If his answer is 'No' an
                         'isEditing' event with the value 'true' is issued. If his
                         answer is 'Yes' the current values will be pushed to the
                         backend and a 'getDataitem' event with a transient dataitem
                         will be issued. This dataitem is not stored by the component
                         (thus transient) and does not contain an 'id' or '$self' 
                         property as the widget does not know the origin of the 
                         worldstate and thus cannot fetch a proper id."
            friendcode="boolean"/>
        <OutputEndpoint
            name="getDataitem"
            type="text"
            label="Get the newly created Dataitem"
            description="Event that is issued if editing mode was started and stopped
                         successfully (without user veto or discard). Provides a
                         transient dataitem that does not contain 'id' or '$self'."
            friendcode="dataslot_json_expanded"/>
        <OutputEndpoint
            name="isEditing"
            type="text"
            label="Is in editing mode"
            description="Event that is issued on various occasions, see input endpoints"
            friendcode="boolean"/>
        <OutputEndpoint
            name="getWorldstateName"
            type="text"
            label="Get the new name of the worldstate"
            description="Event that is issued if the editing mode is actually entered 
                         (setEditing=true), see setEditing input endpoint"
            friendcode="string"/>
        <OutputEndpoint
            name="getWorldstateDesc"
            type="text"
            label="Get the new description of the worldstate"
            description="Event that is issued if the editing mode is actually entered 
                         (setEditing=true), see setEditing input endpoint"
            friendcode="string"/>
    </Platform.Wiring>
```
