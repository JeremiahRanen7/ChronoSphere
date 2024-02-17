function fetchWorldTime() {
  const continent = document.getElementById("continentInput").value;
  const city = document.getElementById("cityInput").value;
  const url = `http://worldtimeapi.org/api/timezone/${continent}/${city}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((val) => {
      console.log(val);
      const [continent, city] = val.timezone.split("/");
      const [date, time] = val.datetime.split("T");
      const dayOfYear = val.day_of_year;

      const resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML = `
            <div class="card text-center" style="width:100%">
  <div class="card-header">
    <b>${continent}</b>
  </div>
  <div class="card-body">
    <h5 class="card-title" style="color:#333D79"><b>${city}</b></h5>
    <p class="card-text" style="color:#333D79">Date : ${date}</p>
  </div>
  <div class="card-footer text-body-secondary">
  <b>${time.slice(0, 8)}</b>
  </div>
</div>
                
            `;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML =
        '<p class="text-danger">Error fetching data. Please check your input.</p>';
    });
}

