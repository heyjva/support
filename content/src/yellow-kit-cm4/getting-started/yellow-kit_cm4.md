---
zendesk:
  article_id: 25221913804189
  name: Home Assistant Yellow Kit with CM4
  description: Home Assistant Yellow Kit with a Raspberry Pi Compute Module 4 and a regular power supply (No PoE).
  position: 1
---

## Prerequisites

- Home Assistant Yellow
- Heat sink assembly bag
- Ethernet cable
- Power supply

Additionally, make sure you have the following items which are not part of the Kit

- Raspberry Pi Compute Module 4 (CM4)
- USB flash drive
   ![Image showing the Home Assistant Yellow with a Raspberry Pi Compute Module 4, Heat sink assembly bag, Ethernet cable, power supply, and a USB flash drive](/static/img/yellow/kit-std.jpeg)

## Opening the case

1. Protecting from ESD.
   - Grounding protects the components from the static electricity that can be naturally present (electrostatic discharge, ESD).

   - **Notice**: Risk of damage to the equipment due to electrostatic discharge.
      - Always: Touch the working surface before touching electronics.
      - Ideally: Use ESD protective equipment, such as ESD table mats and grounding cords.

   ![icon indicating risk of electrostatic discharge (ESD), A triangle including a hand about to touch something](/static/img/yellow/step-2-esd.png)
2. Removing the case - bottom part:
   - Remove the 4 screws on the bottom of the Home Assistant Yellow Kit.
   - Keep the thumb screws close by; you will need them again later.

   ![image showing the bottom of the Yellow with arrows around the thumb-screws indicating counter-clockwise motion](/static/img/yellow/cm5-remove-thumb-screws.jpg)
3. Removing the case - top part.
   - Make sure the interfaces are facing towards your left.
   - Flip the case over.
   - Slightly lift off the enclosure on your left.
   - Slide the enclosure off towards your right.

   ![Clip showing the device from the top, then how to tilt the device and lifting the cover starting on the side away from the connectors](/static/img/yellow/step-4-open.webp)

## Installing the Raspberry Pi Compute Module 4

1. Unpacking the components.
   - Make sure you have all the components:
      - 1 Raspberry Pi Compute Module 4 (CM4)
      - 1 heat sink
      - 2 thermal pads
      - 2 push pins

   ![Clip showing the components layed out, with the case disassembled](/static/img/yellow/step-5-poe-unpacked.jpeg)

2. Align the CM4.
   1. Place the board in front of you, the connectors facing to the right.
   2. Orient the CM4: The CE mark needs to be on the bottom.
   3. Use the outline of the chips to help find the correct orientation of the CM4.
      - **Note**: On CM4 Lite variants, the chips on the bottom edge are in a different location.
   4. Carefully place the CM4 without force.
      - The CM4 should fall into place slightly when correctly aligned.

   ![Top view of the board, without CM4, connectors facing to the right](/static/img/yellow/step-6-poe-align-cm4.jpeg)

3. Installing the CM4.
   - Press the CM4 board onto the board-to-board connectors until it clicks into place.
      1. Make sure you press on both sides (the two long edges).
         - This requires quite a bit of force.
         - If you don't hear a loud click, it is most likely not fully seated.
      2. Do a visual check to make sure the CM4 is installed correctly.
         - It needs to run parallel to the Home Assistant Yellow board.

      ![Top view of the board, without CM4, connectors facing to the right](/static/img/yellow/install-cm4-01.webp)
4. Placing the thermal pads onto the CM4.
   1. Remove the protective cover from one side of the square thermal pad.
   2. Stick the unprotected side onto the SOC (the silver square next to the raspberry icon).
   3. Remove the protective cover from the top side of the thermal pad.
   4. Repeat the steps with the rectangular thermal pad. Place it on the memory (the black rectangle next to the SOC).

   ![Top view of the board, with the CM4 installed](/static/img/yellow/step-7-poe-heat-pads-placement_callouts.jpeg)
5. Placing the heat sink.
   1. Push the 2 plastic push pins into the dedicated hole on the heat sink.
   2. Start by first aligning the right plastic push pins into the dedicated hole on the carrier board.
   3. Then, place the heat sink onto the CM4.

   ![Top view of the board, showing how to install the heat sink](/static/img/yellow/step-8-install-heatsink.webp)

6. Securing the heat sink.
   - Take the entire board off your workplace and push the pins firmly through the carrier board.
   - Ensure that the CM4 is still fully seated after securing the heat sink.

   ![Top view of the board, showing how to fasten the heat sink pins](/static/img/yellow/step-9-push-pins-heatsink.webp)

## Reassembling your Home Assistant Yellow

1. Preparation.
   - Place the translucent bottom part of the case onto the table.
   - Make sure the two round notches form a line pointing towards the top right corner.

   ![Image showing the translucent bottom part of the case, with two round notches forming a line pointing towards the top right corner](/static/img/yellow/reassemble-step-1-bottom-plate-callouts.jpeg)

2. Reassembling - bottom part
   - Place the board onto the bottom part of the case.
   - Make sure the USB connectors are facing upwards, away from you.

   ![Top view of the board with CM4 and heat sink installed](/static/img/yellow/reassemble-step-2-pcb-on-bottom-plate.jpeg)

3. Reassembling - top part
   - Turn the enclosure upside down.
   - Then, slide the push buttons into the openings of the case.

   ![Clip showing how to slide the board into the top cover](/static/img/yellow/close_cover_480.webp)

4. Mounting the case.
   - Insert the 4 thumb screws.
   - **Notice**: Risk of damage to the equipment due to excessive force. Do not over-tighten the screws.

   ![Clip showing how to fasten the thumb screws by turning them clockwise](/static/img/yellow/cm5_insert-thumb-screws.jpg)

## Installing Home Assistant Software on Kit

1. Installing the Raspberry Pi Imager

   - Install the Raspberry Pi Imager on your computer as described under [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/).
      - **Info**: If your platform doesn't support the Raspberry Pi Imager, you can use another imager (e.g. balenaEtcher) and flash the Home Assistant OS Installer for Yellow directly from [GitHub releases](https://github.com/NabuCasa/yellow-buildroot/releases).
      - **Important**: If you are using a Raspberry Pi Compute Module 4 (CM4) that already has software on it, this procedure does not work. Ignore this and the following steps.
         - Instead, follow the procedure [Option 2: Reinstall Home Assistant OS using rpiboot]().
         - The reason is that by default, the CM4 tries to boot from the internal eMMC before booting from the USB flash drive.

   ![Screenshot of Raspberry Pi Imager Download page](/static/img/yellow/rpi_imager.png)

2. Open Raspberry Pi Imager.
   - Under **Raspberry Pi Device**, select **Raspberry Pi 4**.

   ![Raspberry Pi Imager start page](/static/img/yellow/start_rpi_imager.png)

3. Choosing the operating system.
   - Select **Choose OS**.
   - Choose **Other specific-purpose OS**.
   - Choose **Home assistants and home automation**.
   - Choose **Home Assistant**.
   - Choose **Home Assistant OS Installer for Yellow**.

   ![Clip showing how to choose the Home Assistant Operating System](/static/img/yellow/rpi_choose_ha_os.gif)

4. Choosing storage.

   - Insert the USB flash drive into the computer. Note: The contents of this drive will be overwritten.
   - From the dropdown menu, select your USB flash drive.

   ![Screenshot showing the external storage](/static/img/yellow/rpi_choose_storage.png)

5. Writing the installer onto the drive.

   - Select the **Next** button to start the process.
   - Wait for the Home Assistant OS Installer to be written to the USB flash drive.

   ![Screenshot showing the next button](/static/img/yellow/rpi_choose_next.png)

6. Eject the USB flash drive.

7. Insert the USB flash drive with the Home&nbsp;Assistant OS Installer into your Home&nbsp;Assistant&nbsp;Yellow&nbsp;Kit.

   ![Image showing the flash drive plugged into Home Assistant Yellow](/static/img/yellow/plug-usb-flash.jpeg)

8. Connect the Ethernet cable to your Home Assistant Yellow Kit and make sure it has access to the internet.

   - **Note**: Internet is required because the newly installed Home Assistant OS does not contain all Home Assistant components yet. It downloads the latest version of Home Assistant Core on first start.

   ![Image showing the flash drive and the Ethernet cable plugged into Home Assistant Yellow](/static/img/yellow/plug-usb-flash-ethernet.jpeg)

9. Connecting the power supply.

   - If you are not using PoE, connect the power supply to Home Assistant Yellow Kit.
   - **Info**: For CM4 Lite, Home Assistant OS is automatically installed on the NVMe SSD. For regular CM4s, Home Assistant OS is installed onto the eMMC by default.
   - **Advanced**: Forcing installation onto the NVMe SSD when using CM4 with eMMC:
      - Press the blue button while the yellow LED is on constantly (during the 5s window, see next step).

   ![Image showing the flash drive, Ethernet cable, and power supply all plugged into Home Assistant Yellow](/static/img/yellow/plug-usb-flash-ethernet-power.jpeg)

10. Watching the LEDs.

   - Wait for Home Assistant Yellow to start booting from the USB flash drive.
   - During boot, the Yellow LED will blink steadily.
   - Once the installer is ready, the Yellow LED will be constantly on for 5 seconds.
   - **Troubleshooting**: If the LED is stuck in steady blinking or constantly on for an extended period of time, this could indicate that the installer cannot connect to the internet. Follow this procedure to troubleshoot.

   ![Clip showing the LED pattern with the yellow LED blinking steady](/static/img/yellow/led-pattern-blink-steady.webp)

11. Waiting.
    - During installation, the LED will blink fast.
    - Wait for Home Assistant Yellow to finish installing the Home Assistant Operating System.
    - Once the installer finishes installing the Home Assistant Operating System, only the red LED will be on.

   ![Clip showing the LED pattern with the yellow LED blinking fast](/static/img/yellow/led-pattern-install-blink-fast.webp)

12. Disconnecting everything.

   - Remove the USB flash drive.
   - Remove the power cable.

   ![Image showing the connectors of the Yellow with nothing connected to them](/static/img/yellow/plug-nothing.jpeg)

13. Reconnecting power.

   - Reinsert the Ethernet cable.
   - Reinsert the power cable to start Home Assistant (if PoE is not used).

   ![Image showing the the Yellow with Ethernet and power connected](/static/img/yellow/plug-ethernet-power.jpeg)

14. Get started with Home Assistant.

   **Notice**: Initial startup may take a while, depending on your internet connection.
      ![Home Assistant user interface on a screen](/static/img/yellow/HA-get-started-02.png)
   1. Install the app.

      To access Home Assistant from your mobile device, use the QR code to locate the app in the app store.

   2. Select your Home Assistant server.

      **Mobile**: Confirm the IP address detected by the app. For example `http://192.168.1.196:8123`

      **Desktop**: Visit [http://homeassistant.local:8123](http://homeassistant.local:8123) to access the Home Assistant user interface.

   3. The Home Assistant user interface guides you through the initial onboarding.

   4. For further information, refer to the instructions provided under [https://www.home-assistant.io/getting-started/onboarding/](https://www.home-assistant.io/getting-started/onboarding/).

