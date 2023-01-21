import axios from "axios";
import styles from '../styles/Home.module.css'
// import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
// import { text } from "stream/consumers";
const http = axios.create({
  // baseURL: "https://quiz-flask.azurewebsites.net/",
  baseURL: "http://127.0.0.1:5000/",
  // baseURL: "http://127.0.0.1:8080/",
  headers: {
    // 'Access-Control-Allow-Origin': 'https://quiz-flask.azurewebsites.net/',
    'Access-Control-AlloSw-Origin': 'http://127.0.0.1:5000/',
    // 'Access-Control-Allow-Origin': '*' //'http://127.0.0.1:8080/',
    // 'Content-Type': 'text/plain'
  }
})
var place=-1
const back_num = new Array ()
export default function Home() {
  const [fetchedMessage, setFetchedMessage] = useState([""]);
  let get_quiz = async () => {
    // const res = await http.get("/user/1");
    const res = await http.get("api/quiz/1");
    const data = JSON.parse(JSON.stringify(res.data));
    // const text = new Array(4);
    const text = new Array(4);
    // [currentUser, setCurrentUser] = useState<string | null>()
    text[0] = data.quiz
    text[1] = data.answer1
    text[2] = data.answer2
    text[3] = data.correct_answer
    back_num.push(text)
    place+=1
    setFetchedMessage(back_num[place])
    if (typeof document !== 'undefined') { document.getElementById("answer_T")!.style.display = "none" };
    if (typeof document !== 'undefined') { document.getElementById("answer_F")!.style.display = "none" };
    if (typeof document !== 'undefined') { document.getElementById("reload")!.style.display = "none" };
    const choice_1 = document.getElementById("choice_1")!;
    const choice_2 = document.getElementById("choice_2")!;
    choice_1.style.display = "inline";
    choice_2.style.display = "inline";
    };
    console.log(place)
    console.log(back_num)
  let past_quiz = ()=>{
    const shown_quiz=new Array(4) 
    place-=1
    shown_quiz[0]=back_num[place][0]
    shown_quiz[1]=back_num[place][1]
    shown_quiz[2]=back_num[place][2]
    shown_quiz[3]=back_num[place][3]
    console.log(fetchedMessage)
    setFetchedMessage(shown_quiz)
    if (typeof document !== 'undefined') { document.getElementById("answer_T")!.style.display = "none" };
    if (typeof document !== 'undefined') { document.getElementById("answer_F")!.style.display = "none" };
    if (typeof document !== 'undefined') { document.getElementById("reload")!.style.display = "none" };
    const choice_1 = document.getElementById("choice_1")!;
    const choice_2 = document.getElementById("choice_2")!;
    choice_1.style.display = "inline";
    choice_2.style.display = "inline";
  }
  const old_quiz = ()=>{
    place+=1
    setFetchedMessage(back_num[place])
    if (typeof document !== 'undefined') { document.getElementById("answer_T")!.style.display = "none" };
    if (typeof document !== 'undefined') { document.getElementById("answer_F")!.style.display = "none" };
    if (typeof document !== 'undefined') { document.getElementById("reload")!.style.display = "none" };
    const choice_1 = document.getElementById("choice_1")!;
    const choice_2 = document.getElementById("choice_2")!;
    choice_1.style.display = "inline";
    choice_2.style.display = "inline";
  }
  const retry_quiz=()=>{
    if (typeof document !== 'undefined') { document.getElementById("answer_T")!.style.display = "none" };
    if (typeof document !== 'undefined') { document.getElementById("answer_F")!.style.display = "none" };
    if (typeof document !== 'undefined') { document.getElementById("reload")!.style.display = "none" };
    const choice_1 = document.getElementById("choice_1")!;
    const choice_2 = document.getElementById("choice_2")!;
    choice_1.style.display = "inline";
    choice_2.style.display = "inline";
  }
  let judg_answer = async (e: any) => {
    // console.log(e.target.innerText);
    const choice_1 = document.getElementById("choice_1")!;
    const choice_2 = document.getElementById("choice_2")!;
    const reload = document.getElementById("reload")!;
    const answer_T = document.getElementById("answer_T")!;
    const answer_F = document.getElementById("answer_F")!;
    // if (e.target.innerText == fetchedMessage[3]) {
    if (e == fetchedMessage[3]) {
      answer_T.style.display = "block";
      answer_F.style.display = "none";
      choice_1.style.display = "none";
      choice_2.style.display = "none";
      reload.style.display = "block";
    } else {
      answer_T.style.display = "none";
      answer_F.style.display = "block";
      choice_1.style.display = "none";
      choice_2.style.display = "none";
      reload.style.display = "block";
    }
  };
  const handlers= useSwipeable({
      onSwiped: (event) => {
        // document.addEventListener("keydown",p=> {
          console.log(event);
          if (document.getElementById("answer_T")!.style.display == "block" ||document.getElementById("answer_F")!.style.display == "block"){
            if (event.dir=="Left"){
              // 正解表示後の左スワイプイベント
            };
            if (event.dir=="Right"){
              // 正解表示後の右スワイプイベント
            };
            if (event.dir=="Up"){
              if (place+1 < back_num.length){
                retry_quiz()
              }else{
                get_quiz()
              };
            };
            if (event.dir =="Down"){
              if (place==0){
              }else{
                past_quiz()
              }
          }
          }else{
            // if (p.code =="ArrowLeft" || event.dir=="Left"){
              if (event.dir=="Left"){
                // 左にスワイプしたときに発火するイベント
                judg_answer(fetchedMessage[1])
                // hogehoge()
              };
              // if (event.dir == "Right" || p.code =="ArrowRight"){
                if (event.dir == "Right"){
                // 右にスワイプしたときに発火するイベント
                judg_answer(fetchedMessage[2])
                // hogehoge()
              };
              // if (event.dir == "Up" || p.code =="ArrowDown"){
                if (event.dir == "Up"){
                  if (place+1 < back_num.length){
                    old_quiz()
                  }else{
                    get_quiz()
                  };
              };
                if (event.dir =="Down"){
                    if (place==0){
                    }else{
                      past_quiz()
                    }
                }
                
            }
          }
          ,
            trackMouse: true,
         });
          
  useEffect(() => {
    get_quiz();
  }, []);
  return (
    <>
      <div {...handlers} className={styles.entire}>
      
      <div className={styles.container}>
        {/* <Head>
          <title>サバ塩</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}
        <main className={styles.main}>
          <h1 className={styles.title}>
            サバ<span>塩</span>
          </h1>
          <h1 >問題</h1>
          <div id="wrap">
            <div className={styles.box}>
              <h1>
                {fetchedMessage[0]}
                <p id='answer_T'>正解!!</p>
                <p id='answer_F'>不正解</p>
              </h1>
              <h2 id="choice_1" onClick={(e) => judg_answer(e)}>
              ←{fetchedMessage[2]}
              </h2>
              <h2 id='choice_2' onClick={(e) => judg_answer(e)}>
                {fetchedMessage[1]}→
              </h2>
              <h2 id='reload'  onClick={() => get_quiz()}>
                next Quiz
                    ↓
              </h2>
            </div>
          </div>
        </main>
        </div>
      </div>
    </>
  )
}
