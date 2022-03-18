import React from "react";
import Map from "./Map";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="topnav">
          <div className="topnav-right">
            <a href="#mapSection">Map / Карта</a>
            <a href="https://github.com/rupikon/medicine-warriors">Project information / Інформація про проект</a>
          </div>
        </div>

        <div className="logoTitle">
          <img src="/images/medicine_warriors_logo.png" alt="logo" />
          <h1><a href="https://medicinewarriors.org">Medicine Warriors</a></h1>
          <h3>На варті Вашого здоров'я! - We are guarding your health!</h3>
        </div>
        <br/>
      </div>  
      
      <div>
        <center>
          <h2>Про нас</h2>
          <h4>About</h4>
          <p>
            Ми надаємо найсвіжішу інформацію з офіційних джерел про наявність інсуліну в аптеках по всій Україні
          </p>
        </center>
      </div>
      <br/>

      <div>
        <center>
          <h2>Як отримати рецепт?</h2>
          <h4>How to get a prescription?</h4>
          <p>
            Отримати паперовий рецепт можна у лікаря, з яким підписано декларацію на обслуговування (в Центрах первинної-медико-санітарної допомоги), або у  вузького спеціаліста (в Консультативно-діагностичних центрах). Для цього хворому або його представнику необхідно звернутися у заклад без попереднього запису, але з урахуванням вимог комендантської години.
            Окрім інсулінів паперові рецепти наразі діють і на життєво необхідні ліки для хронічних хворих, а також препарати, які відпускаються по програмі <a href="https://moz.gov.ua/dostupni-liki">Доступні ліки</a>. 
            Якщо поблизу вас є одинокі хворі люди – дізнайтеся, чи потрібні їм ліки. Якщо є можливість – сходіть отримати їх рецепт та придбайте медикаменти, які збережуть їм життя.
          </p>
        </center>
      </div>
      <br/>

      <div id="mapSection">
        <center>
          <h2>Карта</h2>
          <h4>Map</h4>
          <p>
            Перелік відкритих аптек може змінюватися з огляду на питання безпеки роботи закладів за конкретними адресами.
            Перед тим як звернутись до найближчої до вас аптеки, варто зателефонувати до неї, щоб дізнатися години її роботи та уточнити наявність інсуліну.
          </p>
        </center>
      </div>
      
      <Map />
      
      <div>
        <center>
          <h2>Контакти</h2>
          <h4>Contacts</h4>
          <p>
            - Гаряча лінія МОЗ 0 800 60 20 19
            <br/>
            {/* - Донейтнути закупівлю ліків для тих, хто не має змоги їх отримати, можна на карту: 4441 1144 5098 0337
            <br/> */}
            - Офіційний сайт Міністерства охорони здоров’я: <a href="https://moz.gov.ua/">https://moz.gov.ua/</a>
            <br/>
            - Список аптек у вигляді таблиці, опублікований Міністерством охорони здоров'я: <a href="https://bit.ly/apteky_insul">https://bit.ly/apteky_insul</a>
            <br/>
            - Якщо ви маєте можливість поділитися ліками чи потребуєте їх, долучайтеся до чату в Telegram: <a href="https://t.me/diapidtrymka">https://t.me/diapidtrymka</a>
          </p>
        </center>
      </div>
      <br/>
      
      <hr/>
      <center><font color="black" face="Geneva, sans-serif" size="1">Powered by <a href="https://cloudlets.zone">Cloudlets.Zone</a></font></center>
    </div>
  );
}
