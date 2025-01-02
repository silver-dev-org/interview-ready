export default function Stopwatch() {
  return (
    <>
      <h1>Weather Component</h1>
      <div>
        Use{" "}
        <a
          href={
            "https://developer.accuweather.com/accuweather-current-conditions-api/apis/get/currentconditions/v1/%7BlocationKey%7D"
          }
        >
          Locations API
        </a>{" "}
        from Accuweather to replicate this component:
        <br />
        <img
          width="199"
          src="https://github.com/user-attachments/assets/f19053da-de38-4457-8f19-53b8a2cae0ee"
        />
        <br />
        <ol>
          <li>
            You should be able to handle initial, loading and error states.
          </li>
          <li>Weather must be shown in Celsius.</li>
          <li>
            This challenge can be approached in many ways, to solve it
            gracefully it matters what kind strategies we use and how we
            organize the code.
          </li>
          <li>No JS libraries allowed.</li>
        </ol>
        <p>Prerequisites: You should get an API Key from Accuweather.</p>
        <p>
          In a real interview situation you should be able to have the main
          functionalities (without styles) in 45 minutes.
        </p>
      </div>
    </>
  );
}
