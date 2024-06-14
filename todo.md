# TodoList

0. Store data in the indexedDb. [.]
0.1 Add current location to the map with name. [.]
0.2 Add location from map with name [.]
1. Draw all of the markers from the db, show their name.[.]
2. Delete marker, from db and from map. [.]
    - When we would like to delete, we open the options.
    - It will add an extra deletion button to the markers.
    - Will open a popup for deletion.
    - if yes, will remove the marker and the database entry.
3. Modify an existing entry. [.]
    - close popup after successful modification
4. Export all of the data into a json file.[.]
5. Import everyting from a json file. [.]
5.1. Hash the resources so it can be downloaded if   they are changed. [.]
6. Publish it to an online space. [.]
7. Add filters for name, date. [.]
8. Add Refresh button, update gps coordinates [.]
9. Make it offline friendly. [Out of scope since it is complicated and not enough space on the phone]
10. Make it possibe to register mushroom names with searchable select. [.]
11. Select a combobox different mushroom names for filter. [.]
12. Make marker more userfriendely larger font, well placed buttons[.]
13. Add a possibility to select icons for the different mushrooms
    - Add ghost mushroom [.]
    - Dynamically read the available mushrooms from the asssets [.]
    - Render the mushroms in the picker [.]
    - Store the selected icon [.]
    - Remember the icon selection when modifying [.]
    - Add a fallback icon if there is no icon defined. [.]
    - When i select an existing mushroom select the corresponding image [.]
    - Make sure that the modal is detached or can't cause problem, since i can see it when i move or zoom in the map. [Not reproducable]
14. Make sure that all of the mushrooms with the same name has the same icon. [.]
15. Add description field [1.0.2]
16. Add update gps current position. [1.0.4]
17. Add offline capability, to save areas in the map.(Service workers)
    - We should have a big rectangle and we can move the map around and change the zoom level
    - Store the rectangle positions and zoom level in the indexedDB/Local storage
    - I want to review and change the offline rectangle position
    - I want to go to a summary page where i will get information how many pictures and approximately how many MB's will it cost
    - I want to download the cache and show the progress as well.
    - Create a success page when it is ready and store the stored urls, it's size, the date it has been modified
    - Set a maximum zoom level
    - Make it possible to edit a stored rectangle, delete it or add a new one
    - List / Show the stored maps for offline views.

[Image resizer](https://imresizer.com/download)
[SVG converter](https://www.freeconvert.com/png-to-svg/download)
[Background remover](https://pixlr.com/express/)
[Crop image](https://www.iloveimg.com/crop-image/crop-png)


HOTIFXES:
- Validate if for the mushroom to save we have all of the props [OK]
- When we read out from the database handle errors [OK]
- When we save handle errors [OK]
- Add versioning [OK]
- Solve the modal problem, it should not be visible when the map is moved [Not experienced]
- When editing the modal, the mushroom's image should be selected. [1.0.3]
- Add pisztric, korall, pirulo galoca
- Can't delete a mushroom immediately after it was created (Since we don't have an id yet in the indexedDB)