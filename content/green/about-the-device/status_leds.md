---
article_id: 25210352599197
name: About the LEDs
position: 1
labels: green, about the system, status
---

Home Assistant Green has 3 LEDs.

White LED: Power LED
Green LED: Activity LED
Yellow LED: Home Assistant Green system health LED
![Clip showing the 3 LEDS on Home Assistant Green](/static/img/green/green_yellow_led_heartbeat.webp)

## Power LED (white)

The power LED indicates whether the system is powered. If the LED is off, check the power supply.

## Activity LED (green)

The activity LED indicates various firmware and boot loader states at startup. Once Home Assistant OS has been started, the green LED indicates activity. Activity is defined as disk (eMMC) or any CPU load.

## System health LED (yellow)

The yellow system health LED blinks in a heartbeat pattern if the Home Assistant operating system is running.

## Disabling the LEDs

This feature requires HAOS version 11.0 or later.

If the LEDs seem too bright for your environment, you can disable them.

1. Go to [**Settings** > **System** > **Hardware**](https://my.home-assistant.io/redirect/hardware/) and select **Configure** > **Configure hardware settings**.
2. In the dialog, select the toggles to disable the LEDs and submit the changes.
    - **Result**: The LEDs are now disabled.
