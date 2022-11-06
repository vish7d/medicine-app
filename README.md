# Pharma-Store
### Medicine delivered at your door step.

Prerequistes:
1. Node Runtime. 
2. Expo.
3. Firebase.
3. Android Emulator.

## Steps to run the project locally.
1. Clone the repo.
2. cd medicine-app
3. Run ```npm install ``` to install all the dependencies
4. Run ```npx expo start --localhost ``` to start the server.
5. Make sure the andriod emulator is running locally. For more info refer this link https://docs.expo.dev/workflow/android-studio-emulator/

More info about the expo: https://docs.expo.dev/


## Data model
Medicines information:
```
[
    {
      "description": "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, nerve pain, toothache, sore throat, period (menstrual) pains, arthritis, muscle aches, and the common cold",
      "id": 1,
      "name": "Dolo 650",
      "price": 5
    },
    {
      "description": "Crocin Advance Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, nerve pain, toothache, sore throat, period (menstrual) pains, arthritis, muscle aches, and the common cold.",
      "id": 2,
      "name": "Crocin Advance",
      "price": 10
    }
]
```

Orders information:  
*Todo: Store only the reference to medicine using medicine id.*
```
[
        {
          "description": "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, nerve pain, toothache, sore throat, period (menstrual) pains, arthritis, muscle aches, and the common cold",
          "name": "Dolo 650",
          "order_id": "e8989f6a-0990-47fb-99cc-2d363ff8aacd",
          "ordered_date": "2022-10-15T07:59:47.069Z",
          "price": 5,
          "quantity": "10"
        },
        {
          "description": "Useful for back pain, stiff neck, frozen shoulder, joint aches, arthritic pain, sprains, and muscle pulls",
          "name": "Systaflam Gel",
          "order_id": "e8989f6a-0990-47fb-99cc-2d363ff8aacd",
          "ordered_date": "2022-10-15T07:59:47.069Z",
          "price": 65,
          "quantity": "2"
        }
      ]
```

## High level component diagram:   
![image](https://user-images.githubusercontent.com/46806187/196982413-0478185a-be9d-4a8f-a168-7c3185fa94da.png)


## Workflows:  
<img src="https://user-images.githubusercontent.com/46806187/196981967-be7d5aa6-5fa4-4ffd-aab5-d99ac37aad2a.png" width="500px" />

<img src="https://user-images.githubusercontent.com/46806187/196982141-06728050-9234-42a7-8d19-ec60657c9d32.png" width="500px" />

<img src="https://user-images.githubusercontent.com/46806187/196982200-408dd2ca-0de0-45de-82ba-3f4b35609e4c.png" width="500px" />




https://user-images.githubusercontent.com/56623157/200176787-b2cf34ca-8826-45c8-9937-fc8d96650d29.mp4

