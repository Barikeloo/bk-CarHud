JB = {
    sendNUI = SendNUIMessage,
    thread  = CreateThread,
    sleep   = function(msec)
        return Wait(msec)
    end,
    playerPed = function()
        return PlayerPedId()
    end,
    getVehicle = function()
        return GetVehiclePedIsIn(JB.playerPed())
    end,
    getSpeed = function()
        return GetEntitySpeed(JB.playerPed());
    end,    
    getVehClass = function()
        return GetVehicleClass(GetVehiclePedIsIn(JB.playerPed(), false));
    end,    
    isInVehicle = function()
        return IsPedInAnyVehicle(JB.playerPed());
    end,    
    setVehicleSeat = function(seat)
        return GetPedInVehicleSeat(JB.getVehicle(), seat);
    end,
    speedoMeter = {
        Init = function()
            while true do 
                local inBike = false 
                local inAnyCar = false
                local sleep = 1000
                local km = (JB.getSpeed()* 3.6)
                if JB.isInVehicle() then 
                    cinturon = false
                    sleep = 100
                    inBike = false 
                    inAnyCar = false
                    local vc = JB.getVehClass()
                    if((vc >= 0 and vc <= 12)) then
                        inAnyCar = true
                    elseif(vc == 13) then
                        inBike = true
                    end
                    JB.sendNUI({
                        action = "speedometer";
                        fuel   = GetVehicleFuelLevel(JB.getVehicle());
                        damage = GetVehicleEngineHealth(JB.getVehicle());
                        engine    = GetVehicleCurrentGear(JB.getVehicle());
                        on = GetIsVehicleEngineRunning(JB.getVehicle());
                        speed  = km;
                        Bici = inBike;
                    })
                else
                    JB.sendNUI({
                        action = 'hideSpeedo';
                    })
                end
                JB.sleep(sleep)
            end
        end,
    }
}
JB.thread(JB.speedoMeter.Init)