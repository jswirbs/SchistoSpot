# TTTT
Cross-platform app for imaging and analysis portion of an automated diagnostic method that uses microscopy and image analysis to detect schistosomiasis eggs in urine samples. 

## Project setup 

To get up and running:
* Clone this repo
  * `git clone https://github.com/jswirbs/TTTT.git`
  * `cd TTTT`
* Install [NodeJS](https://nodejs.org/en/)
* Install expo command line tool
  * `npm install expo-cli --global`
* Open the expo client to preview the app
  * `expo start`
  * You will then be given a QR code you can scan to run in the expo app on your phone, along with options to run in a simulator/emulator on your computer



## Project background

Schistosomiasis is a neglected tropical disease that affects over 200 million people, especially in under-developed communities in Africa. Despite a high socioeconomic impact and significant mortality, the disease still lacks attention, in addition to accurate and accessible diagnostics1. One common diagnostic method is to filter urine samples using a pore size of 12μm and then examining the residue for schistosomiasis eggs using microscopy2. However, this method requires a team of trained researchers to collect and examine the samples, which is not effective for mass diagnosis considering the scope of schistosomiasis. Additionally, the funding required to compensate such a team limits this method of diagnosis in particularly impoverished areas. Therefore, there exists a need for a higher throughput diagnostic method which is low-cost and requires less trained labor so that more people infected with schistosomiasis are able to be identified and diagnosed.

Our team proposes a partially automated diagnostic method that incorporates microscopy and machine learning in order to detect schistosomiasis eggs in urine samples, eliminating the need for full teams of clinical researchers and increasing speed of diagnosis. Urine samples are to be collected and filtered using paper filters with a pore size of 10-20μm. The filtrate will be placed on slides and examined using a bespoke microscope. The microscope will complete the remainder of the diagnosis, using automated motors to sweep the slide along the field of view until the entirety of the sample has been magnified. Simultaneously, an iPhone attached using an eyepiece-to-camera adapter will capture high frequency images of the sample as it is swept, and these images will be rapidly analyzed using a machine learning algorithm that identifies schistosomiasis eggs. If the sample exceeds to-be-determined statistical thresholds, then a positive diagnosis will be returned along with the severity of infection. The IPhone will use software developed by the team to capture and export the images. This proposed methodology seeks to increase the speed and accessibility of diagnosis for schistosomiasis compared to existing methods which need considerable human input. 
	
The microscope is intended to be a low-cost design, with a 3D printed frame that will accommodate a similarly printed stage along with the objective and eyepiece lenses. The printed stage will have knobs that are able to easily be turned by the motors so that the sweeping of the sample in the field of view can occur. This will require access to a 3D printer along with a circuitry space to design and implement the motors. An Arduino board will be used to control and coordinate the motors with the imaging software on the IPhone, most likely using a bluetooth connection between the phone and Arduino. For the machine learning algorithm, it will need to be trained using a database of imaged urine samples that a lab can hopefully provide. 
