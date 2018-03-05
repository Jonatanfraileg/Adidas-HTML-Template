%%[
/*Defining the Customer ID attribute which is contained in Abandoned Cart Event data extension to perform a Lookup to customers data */
var @customerID,@lookupsubscriberlanguage
Set @customerID = [Customer ID]
Set @lookupsubscriberlanguage = LookupRows('Customers', 'Customer ID', @customerID)

/*To check if exist preference language communication. If not, communication will not be sent*/


IF rowcount(@lookupsubscriberlanguage) > 0 Then
var @CustomerIDrow, @languagefield
Set @CustomerIDrow = Row(@lookupsubscriberlanguage,1)
Set @languagefield = Field(@CustomerIDrow, "Preference Language Communication")

ELSE 

/*At send time, if any subscriber hasn't got a prefered language defined, and there isn't exist a business rule, it will not be sent the communication*/
RaiseError("This customer do not have a prefered language defined")
ENDIF
]%%

%%[IF @languagefield == 'EN' THEN]%% 
%%=ContentBlockbyId("Header Asset ID for GB")=%% 
%%[ELSEIF @languagefield == 'ES' THEN]%% 
%%=ContentBlockbyId("Header Asset ID for ES")=%% 
%%[ELSEIF @languagefield == 'DE' THEN]%% 
%%=ContentBlockbyId("Header Asset ID for DE")=%% 
%%[ELSE]%% 

/*In this case, marketers should put ELSE IF statements until completing the 18 Content Block per countries*/
%%=RaiseError("This customer do not have a prefered language defined")=%% 
%%[ENDIF]%%
