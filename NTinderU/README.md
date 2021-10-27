# 網服期末Project

## [109-1] Web Programming Final

(Group 74) NTinderU  

- 本README的排版沒死掉版本: https://hackmd.io/@brian891221/S1NeI38y_  

- Deploy連結: https://ntinderu.github.io/NTinderU  

- Demo影片連結: https://youtu.be/Ixw0OZebQq0  

- 描述這個服務在做什麼:  
NTinderU是由台大學生親手打造，土生土長保證純血  
對重視血統的台大學生來說，是最適合的交(友)配(對)網站。  
我們不搜集過多的使用者資訊就是為了讓大家放心使用  
同時參考了知名交友軟體的介面也使大家更容易上手  

- 操作方式:  
註冊登入後 可以看到使用者的名字和他們的照片  
操作方式相信大家都心知肚明  
也可以點擊切換Messages跟已經配對成功的對象聊天  

- GithubLink: 不公開  
各位老師們別羞辱我們了  

- 其他說明:  

--- 

**如果白色畫面讀取很久的話，是因為我們沒有用SSL加密過的websocket**  
**Firefox**: 請到about:config尋找network.websocket.allowInsecureFromHTTPS這項設定並將它改成true  
**Chrome/Edge**: 請點網址欄左邊的圖示，然後選網站權限，拉到下面找「不安全的內容」選項並設定為允許  
**如果助教想評分的話建議clone下來進frontend然後yarn start**  

---

目前由於後端Server不夠強有時候會有聊天室沒有成功出現的情形  
只要重新登入就可以看見了  

- 使用與參考之框架/模組/原始碼:  
    - Frontend: React.js  
    - Backend: Node.js  
    - DB: MongoDB  

- 專題製作心得:  
這是第一次完全沒有任何Sample Code從零打造出一個網路服務  
一開始整體的分工很不明確，大家各寫各的部分之後要Merge時就很痛苦  
這次利用的都是上課有教過的套件，相較之下比較熟悉一點但也有很多細節要注意  
不然就會發生奇怪的重複render事件，也有的問題是在deploy以後才冒出來  
透過這次Project真的映證了教授期初說的網路服務一點也不簡單  
也學到了怎麼去設計一個服務以及怎麼與同組的老師們合作不要扯後腿  
謝謝各位老師們的指教  

- 使用之第三方套件、框架、程式碼:  
    - Apollo Client/Server (graphql)  
    - Mongoose  
    - React-bootstrap  
    - webpack  
    - properJS  
    - bCryptJS  
    - jQuery  
    - create-react-app   
    - sass  
    - gh-pages  
    - heroku  

---

## Private Part

- 組員分工  
    - B08902001 龍品瑞  
    負責前端UI整體版面設計  
    帳號的系統  
    Deploy到雲端  
    大腿  
    
    - B08902134 曾揚哲  
    負責聊天部分的後端  
    連接前後端  
    上傳圖片至imgur的相關元件  
    大腿  
    
    - B08902124 李驊諺  
    負責配對部分的後端  
    連接前後端  
    處理hook的怪bug  
    寫報告  
    
- 其他建議  
Hackthon的教室太擠了  
