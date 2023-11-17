document.addEventListener("DOMContentLoaded", function() {


    const dailyBtn = document.getElementById("daily-btn");
    const weeklyBtn = document.getElementById("weekly-btn");
    const monthlyBtn = document.getElementById("monthly-btn");
    const activityDisplay = document.querySelector(".card-container");

    let selectedTimeframe = "weekly"; // Default to timeframe
    let selectedbtn = setActiveButton(weeklyBtn);

    dailyBtn.addEventListener("click", () => {
        selectedTimeframe = "daily";
        displayData();
        setActiveButton(dailyBtn);
    });

    weeklyBtn.addEventListener("click", () => {
        selectedTimeframe = "weekly";
        displayData();
        setActiveButton(weeklyBtn);
    });

    monthlyBtn.addEventListener("click", () => {
        selectedTimeframe = "monthly";
        displayData();
        setActiveButton(monthlyBtn);

    });

    function displayData() {
        fetch("data.json") 
            .then(response => response.json())
            .then(data => {
                activityDisplay.innerHTML = "";
                const dataToShow = data.map(activity => {
                   const displayElement = document.createElement('div')
                   displayElement.classList.add('card');
                   
       
                   displayElement.innerHTML=`
                                <div class="image-container">
                                    <img src="${activity.image}" class="image">
                                </div>

                                <div class="activity">
                                    <div class="top">
                                        <p class="title">${activity.title}</p>
                                        <img src="./images/icon-ellipsis.svg">
                                    </div>
                                    <div class="mid">
                                        <h1 class="current">${activity.timeframes[selectedTimeframe].current}hrs</h1>
                                        <p class="previous">Last Week - ${activity.timeframes[selectedTimeframe].previous}hrs</p>
                                    </div>
                                </div>
                `
                activityDisplay.appendChild(displayElement)
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }
    
    function setActiveButton(btn) {
        // Remove 'active' class from all buttons
        [dailyBtn, weeklyBtn, monthlyBtn].forEach(button => {
            button.classList.remove('active');
            button.style.color = '';
        });

        // Set 'active' class and white background for the clicked button
        btn.classList.add('active');
        btn.style.color = '#FFF';
    }

    
    displayData(); // Initially display the data with the default timeframe
});
