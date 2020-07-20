const vscode = require('vscode');

// vscode.languages.registerHoverProvider('dsl', {
  
//     provideHover(document, position, token) {
//         // console.log(document, position, token)
//       return {
//         contents: ['Hover Content']
//       };
//     }

//   });

const witEntities = [
  {label: "age_of_person"},
  {label: "agenda_entry"},
  {label: "amount_of_money"},
  {label: "bye"},
  {label: "contact"},
  {label: "creative_work"},
  {label: "datetime"},
  {label: "distance"},
  {label: "duration"},
  {label: "email"},
  {label: "greetings"},
  {label: "local_search_query"},
  {label: "location"},
  {label: "math_expression"},
  {label: "message_body"},
  {label: "notable_person"},
  {label: "number"},
  {label: "on_off"},
  {label: "ordinal"},
  {label: "phone_number"},
  {label: "phrase_to_translate"},
  {label: "quantity"},
  {label: "reminder"},
  {label: "search_query"},
  {label: "sentiment"},
  {label: "temperature"},
  {label: "thanks"},
  {label: "url"},
  {label: "volume"},
  {label: "wikipedia_search_query"},
  {label: "wolfram_search_query"},
]

vscode.languages.registerCompletionItemProvider('dsl', {
  
  provideCompletionItems(document, position, token, context){
    if (document.lineAt(position.line).text == "(")
      return [
        {label: "action"},
        {label: "response"},
        {label: "hint"},
        {label: "supplementary"},
        {label: "title"},
        {label: "note"},
        {label: "icon"},
        {label: "button"},
        {label: "alt"}
      ]
  }
}, "(");

vscode.languages.registerCompletionItemProvider('nlp', {
  
  provideCompletionItems(document, position, token, context){
    line = document.lineAt(position.line).text
    match_line = line.match("^\\[E:wit\\$")
    if (match_line && position.character == 7)
      return witEntities
  }
}, '$');

vscode.languages.registerCompletionItemProvider('dsl', {
  
  provideCompletionItems(document, position, token, context){
    r = RegExp("^\\[(V|F)(:)\\w+(:)\\w+(:)\\w+(:)\\]?")
    line = document.lineAt(position.line).text
    match_line = line.match(r)
    if (match_line && match_line[0].lastIndexOf(":") == position.character-1) {
      return [
        {label: "save_text"}
      ]
    } else {
      r = RegExp("^\\[(V|F)(:)\\w+(:)\\w+(:)\\]?")
      match_line = line.match(r)
      if (match_line && match_line[0].lastIndexOf(":") == position.character-1) {
        return [
          {label: "normal"},
          {label: "timeseries"},
          {label: "in_session"},
          {label: "in_cache"},
          {label: "timeseries_in_cache"}
        ]
      } else {
        r = RegExp("^\\[(V|F)(:)\\w+(:)\\]?")
        match_line = line.match(r)
        if (match_line && match_line[0].lastIndexOf(":") == position.character-1) {
          return witEntities;
        }
      }
    }
  }
}, ":");
