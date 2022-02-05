CreateThread(function()
        while true do 
            local inBike = false 
            local inAnyCar = false
            local sleep = 1000
            local speed = GetEntitySpeed(PlayerPedId())
            local km = (speed * 3.6)
            if IsPedInAnyVehicle(PlayerPedId()) then 
                sleep = 100
                inBike = false 
                inAnyCar = false
                local vc = GetVehicleClass(GetVehiclePedIsIn(PlayerPedId(), false))
                if((vc >= 0 and vc <= 12)) then
                    inAnyCar = true
                elseif(vc == 13) then
                    inBike = true
                end
                SendNUIMessage({
                    action = "speedometer";
                    fuel   = GetVehicleFuelLevel(GetVehiclePedIsIn(PlayerPedId()));
                    damage = GetVehicleEngineHealth(GetVehiclePedIsIn(PlayerPedId()));
                    engine    = GetVehicleCurrentGear(GetVehiclePedIsIn(PlayerPedId()));
                    on = GetIsVehicleEngineRunning(GetVehiclePedIsIn(PlayerPedId()));
                    speed  = km;
                    Bici = inBike;
                })
            else
                SendNUIMessage({
                    action = 'hideSpeedo';
                })
            end
            Wait(sleep)
        end
end)
