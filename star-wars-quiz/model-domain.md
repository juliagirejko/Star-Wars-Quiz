# Star Wars Quiz App

## Log in component and service
| Components      | Members          | Methods        | Scenario                                                      | Outputs |
|-----------------|------------------|----------------|---------------------------------------------------------------|---------|
| LoginComponent  | isGuest: boolean | login()        | if login given and correct password given redirect to '/home' |         |
|                 | username: string |                | if password has less then 5 chars block button 'Log In'       |         |
|                 | password: string | logInAsGuest() | redirect to '/home' and set observable isGuest$ as true       |         |

| Services    | Members  | Methods       | Scenario                                           | Outputs          |
|-------------|----------|---------------|----------------------------------------------------|------------------|
| AuthService | isGuest$ | setAsGuest()  | set Observable isGuest$ as true                    |                  |
|             |          | login()       | if the password and username are correct set token | HttpResponse 200 |
|             |          |               | if the password and username are not correct       | HttpResponse 401 |
|             |          | isUserLogIn() | if the token is not null                           | true             |
|             |          |               | if the token is null                               | false            |
|             |          | logout()      | remove token                                       |                  |

## Quiz components an service

| Components         | Members                | Methods       | Scenario                               | Outputs |
|--------------------|------------------------|---------------|----------------------------------------|---------|
| StartPageComponent | questionSize: Number[] | setQuestion() | set Observable questionTable$ for quiz |         |
|                    | questionType: String[] | logout()      | redirect to '/login'                   |         |
|                    | selectedSize: number   |               |                                        |         |
|                    | selectedType: number   |               |                                        |         |
|                    | isGuest: boolean       |               |                                        |         |

| Components             | Members                     | Methods                  | Scenario                                                                                              | Outputs |
|------------------------|-----------------------------|--------------------------|-------------------------------------------------------------------------------------------------------|---------|
| QuestionQuizComponent  | question: Quiz              | loadQuestion()           | if type and id is given from path set question from questionTable$ by id and get extra random answers |         |
|                        | selectedAnswerIndex: number | submitAnswer()           | if index of selected answer is the same as index of correct answer add point to Observable score$     |         |
|                        | id: number                  |                          | if id is less than questionTable length increment id and set ne question                              |         |
|                        | type: string                |                          | if id is more than questionTable set isQuizFinished as true                                           |         |
|                        | questionsTable: string[]    |                          | if client not registered in bank                                                                      |         |
|                        | isQuizFinished: boolean     | getClientByID(String id) | if client exists in bank                                                                              |         |
|                        |                             |                          | if client does not exist in bank                                                                      |         |

| Components          | Members                               | Methods       | Scenario         | Outputs |
|---------------------|---------------------------------------|---------------|------------------|---------|
| FinalScoreComponent | score: number                         | showAnswers() | set show as true |         |
|                     | show: boolean                         |               |                  |         |
|                     | isGuest: boolean                      |               |                  |         |
|                     | answerTable: {q: string, a: string}[] |               |                  |         |
|                     | id: number                            |               |                  |         |
|                     |                                       |               |                  |         |
|                     |                                       |               |                  |         |

| Services         | Members                                   | Methods                                                         | Scenario                                                                                        | Outputs                   |
|------------------|-------------------------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------|---------------------------|
| StarWarsService  | characterList: any[]                      | getAnswers(q: string, type: string)                             | if given question found generate random options by type and sort them randomly                  | Object                    |
|                  | filmsList: any[]                          |                                                                 | if given question not found                                                                     | Error                     |
|                  | score: number                             | getRandomCharacterResults()                                     | if http request 200 set characterList                                                           |                           |
|                  | questionsTable: string[]                  |                                                                 | if http request did not work                                                                    | Error                     |
|                  | questionList: { q: string; a: string; }[] | getRandomCharacterOptions(count: number, correctAnswer: string) | if characterList not empty add names that are not correct answer to list                        |                           |
|                  | answerTable: {q: string, a: string}[]     |                                                                 | if characterList is undefined                                                                   | Error                     |
|                  | score$                                    | getRandomFilmsResults()                                         | if http request 200 set filmList                                                                |                           |
|                  | questionsTable$                           |                                                                 | if http request did not work                                                                    | Error                     |
|                  |                                           | getRandomMovieOptions(count: number, correctAnswer: string)     | if filmList not empty add names that are not correct answer to list                             |                           |
|                  |                                           |                                                                 | if filmList is undefined                                                                        | Error                     |
|                  |                                           | getRandomQ()                                                    | return question by random index                                                                 | { q: string; a: string; } |
|                  |                                           | setQuestionList(type: string)                                   | set questionList by type                                                                        | string[]                  |
|                  |                                           | getQ(q: string)                                                 | find the question in questionList                                                               | { q: string; a: string; } |
|                  |                                           | checkAnswer(question: Quiz, selectedAnswerIndex: number)        | if selectedAnswerIndex is the same as index of correct answer increment score                   |                           |
|                  |                                           | approveOverdraft()                                              | if selectedAnswerIndex is not the same as index of correct answer added question to answerTable |                           |
|                  |                                           | setFinalScore()                                                 | zero the score                                                                                  | false                     |
|                  |                                           | setQuestionsTable(size: number, type: string)                   | add to questionTable uniq random questions so the length of table will be less than size        |                           |

