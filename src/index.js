const { app, BrowserWindow ,Menu} = require('electron');
const path = require('path');
const si = require('systeminformation');
const cu=require('os-utils');
const { getSystemMemoryInfo } = require('process');
const { data } = require('jquery');
const { Console } = require('console');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
 Menu.setApplicationMenu(null);
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration:true
    }
    
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
 
  
  // Open the DevTools.
mainWindow.webContents.openDevTools();

si.graphics()
  .then(data=>{
  mainWindow.webContents.send('g1_bus',data.controllers[0].bus)
  mainWindow.webContents.send('g1_model',data.controllers[0].model)
  mainWindow.webContents.send('g1_vram',data.controllers[0].vram)
  mainWindow.webContents.send('g1_dram',data.controllers[0].vramDynamic)
  mainWindow.webContents.send('g2_vendor',data.controllers[1].vendor)
  mainWindow.webContents.send('g2_bus',data.controllers[1].bus)
  mainWindow.webContents.send('g2_model',data.controllers[1].model)
  mainWindow.webContents.send('g2_vram',data.controllers[1].vram)
  mainWindow.webContents.send('g2_dram',data.controllers[1].vramDynamic)

  mainWindow.webContents.send('dis_vendor',data.displays[0].vendor)
  mainWindow.webContents.send('dis_model',data.displays[0].model)
  mainWindow.webContents.send('dis_x',data.displays[0].resolutionx)
  mainWindow.webContents.send('dis_y',data.displays[0].resolutiony)
  mainWindow.webContents.send('dis_refreshrate',data.displays[0].currentRefreshRate)
  mainWindow.webContents.send('dis_c_y',data.displays[0].currentResX)
  mainWindow.webContents.send('dis_c_x',data.displays[0].currentResY)


  
  mainWindow.webContents.send('dis_pixel',data.displays[0].pixeldepth)
  si.osInfo().then(data=>{
    mainWindow.webContents.send('os_hostname',data.hostname)
})
.catch(err=>console.error(err))

})



si.cpu().then(data=>{
mainWindow.webContents.send('cpu_brand',data.brand)
mainWindow.webContents.send('cpu_cores',data.cores)
mainWindow.webContents.send('cpu_family',data.family)
// mainWindow.webContents.send('cpu_governor',data.governor)
mainWindow.webContents.send('cpu_manufacturer',data.manufacturer)
mainWindow.webContents.send('cpu_model',data.model)
mainWindow.webContents.send('cpu_processors',data.processors)
// mainWindow.webContents.send('cpu_revision',data.revision)
mainWindow.webContents.send('cpu_socket',data.socket)
// mainWindow.webContents.send('cpu_voltage',data.voltage)
mainWindow.webContents.send('cpu_stepping',data.stepping)
mainWindow.webContents.send('cpu_vendor',data.vendor)
})

.catch(error=>console.error(error))

setInterval(()=>{
  cu.cpuUsage(data=>
    {
  
    
    mainWindow.webContents.send('cpu',data*100)
    mainWindow.webContents.send('Mem',cu.freememPercentage()*100)
    mainWindow.webContents.send('Total-mem',cu.totalmem()/1024)





  
    si.osInfo( ).then(data=>{
      mainWindow.webContents.send('os_arch',data.arch)
      mainWindow.webContents.send('os_build',data.build)
      mainWindow.webContents.send('os_codename',data.codename)
      mainWindow.webContents.send('os_codepage',data.codepage)
      mainWindow.webContents.send('os_distro',data.distro)
      mainWindow.webContents.send('os_kernel',data.kernel)
      mainWindow.webContents.send('os_logofile',data.logofile)
      mainWindow.webContents.send('os_hostsp',data.hostname)
    
    
    
    
      //gpart2
      mainWindow.webContents.send('os_platform',data.platform)
      mainWindow.webContents.send('os_release',data.release)
      mainWindow.webContents.send('os_serial',data.serial)
      mainWindow.webContents.send('os_servicepack',data.servicepack)
      mainWindow.webContents.send('os_uefi',data.uefi)
      
    
    
    })
    .catch(err=>console.error(err))
  
    si.uuid().then(data=>{
      mainWindow.webContents.send('os_uuid',data.os)
    })
    .catch(err=>console.error(err))
 
    si.system().then(data=>{
      mainWindow.webContents.send('sys_manufacturer',data.manufacturer)
      mainWindow.webContents.send('sys_model',data.model)
      mainWindow.webContents.send('sys_serial',data.serial)
      mainWindow.webContents.send('sys_sku',data.sku)
      mainWindow.webContents.send('sys_uuid',data.uuid)
      mainWindow.webContents.send('sys_version',data.version) 
      // mainWindow.webContents.send("version",data.version)
    
    })
    .catch(error=>console.error(error))
    si.chassis().then(data=>{
      mainWindow.webContents.send('chasis_assettag',data.assetTag)
      mainWindow.webContents.send('chasis_manufacturer',data.manufacturer)
      mainWindow.webContents.send('chasis_model',data.model)
      mainWindow.webContents.send('chasis_serial',data.serial)
      mainWindow.webContents.send('chasis_sku',data.sku)
      mainWindow.webContents.send('chasis_type',data.type)
      mainWindow.webContents.send('chasis_version',data.version)
    
    })
    .catch(err=>console.error(err))
    
    si.baseboard().then(data=>{
      mainWindow.webContents.send('baseboard_assettag',data.assetTag)
      mainWindow.webContents.send('baseboard_manufacture',data.manufacturer)
      mainWindow.webContents.send('baseboard_model',data.model)
      mainWindow.webContents.send('baseboard_serial',data.serial)
      mainWindow.webContents.send('baseboard_version',data.version)
      
    
    })
    .catch(err=>console.error(err))
    si.bios().then(data=>{
      mainWindow.webContents.send('bios_vendor',data.vendor)
      mainWindow.webContents.send('bios_releasedate',data.releaseDate)
      mainWindow.webContents.send('bios_revision',data.revision)
      mainWindow.webContents.send('bios_version',data.version)
    
    })
    .catch(error=>console.error(error))
    si.networkGatewayDefault().then(data=>{
      mainWindow.webContents.send('net_gateway',data)
    })
    .catch(err=>console.error(err))
    si.networkStats().then(data=>{
      
      
      mainWindow.webContents.send('net_stats',JSON.stringify( data).replace('[{"',"").replace("}]"," ").replace('":\"',' ->'))
    })
    .catch(err=>console.error(err))
    si.networkInterfaceDefault().then(data=>{
      mainWindow.webContents.send('net_interface',data)
    })
    .catch(err=>console.error(err))

    si.wifiNetworks().then(data=>{
      mainWindow.webContents.send('wifi_stats',JSON.stringify(data).replace('[{"',"").replace("}]"," ").replace('":\"',' ->'))

    })
    .catch(err=>console.error(err))

    si.battery().then(data=>{
      mainWindow.webContents.send('bat_accon',data.acconnected)
      mainWindow.webContents.send('bat_capacity',data.capacityUnit)
      mainWindow.webContents.send('bat_currentcap',data.currentcapacity)
      mainWindow.webContents.send('bat_designedcap',data.designedcapacity)
      mainWindow.webContents.send('bat_has',data.hasbattery)
      mainWindow.webContents.send('bat_is',data.ischarging)
      mainWindow.webContents.send('bat_manufacturer',data.manufacturer)
      mainWindow.webContents.send('bat_maxcap',data.maxcapacity)
      mainWindow.webContents.send('bat_model',data.model)
      mainWindow.webContents.send('bat_percent',data.percent)
      mainWindow.webContents.send('bat_serial',data.serial)
      mainWindow.webContents.send('bat_time',data.timeremaining)
      mainWindow.webContents.send('bat_type',data.type)
      mainWindow.webContents.send('bat_volt',data.voltage)
   
  
   })
   .catch(err=>console.error(err))
   si.cpuCurrentspeed().then(data=>{
    mainWindow.webContents.send('cpu_avg',data.avg)
    mainWindow.webContents.send('cpu_sp_cores',data.cores)
    mainWindow.webContents.send('cpu_max',data.max)
    mainWindow.webContents.send('cpu_min',data.min)
   
  
  })
  .catch(error=>console.error(error))
  si.cpuCache().then(data=>{
  mainWindow.webContents.send('cpu_l1d',data.l1d)
  mainWindow.webContents.send('cpu_l1i',data.l1i)
  mainWindow.webContents.send('cpu_l2',data.l2)
  mainWindow.webContents.send('cpu_l3',data.l3)
  })
  .catch(error=>console.error(error))
  });},1000);
  

  

  



};




  



  
 


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
