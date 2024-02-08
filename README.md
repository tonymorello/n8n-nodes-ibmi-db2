# n8n-nodes-ibmi-db2

This is an n8n community node. It lets you query a DB2 instance running on iSeries (AS400) in your n8n workflows.

I created this node for internal use (initially based off of [GeorgeJeffcock/n8n](https://github.com/GeorgeJeffcock/n8n)'s repo for reference as I was learning how to write custom nodes).  
It uses node-jt400 to establish a TCP/IP connection to the database and runs a query returning the results as data that can be used in n8n.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Requirements](#requirements)  
[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Requirements

Since this package uses [node-jt400](https://github.com/tryggingamidstodin/node-jt400) to connect to IBMi/AS400, prior to installing the node, your environment will need to meet the following requirements:

### Linux

* g++
* make

### Windows
* [Windows Build Tools](https://www.npmjs.com/package/windows-build-tools)

### Mac

* [Xcode IDE](https://developer.apple.com/xcode/ide/)

### Docker
Due to its dependencies, currently this package is not compatible with the Docker version of n8n out of the box, unless
you modify the base image to include the required tools.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

* **Query** - Execute a SQL query
* **Insert** - Insert rows in database
* **Update** - Update rows in database
* **Delete** - Delete rows in database

## Credentials

The node supports the following credentials/settings:
* **Host** - _TCP/IP host name/address of the database server_
* **User** - _User name for connecting to the database_
* **Password** - _Password for connecting to the database_
* **Database** (optional) - _Default database/schema_
* **Libraries** (optional) - _Specifies one or more libraries that you want to add/replace in the library list_
* **Port** (optional) - _Connection port_
* **Translate Binary** (optional) - _Specifies whether binary data is translated. If this property is set to "true", then BINARY and VARBINARY fields are treated as CHAR and VARCHAR fields (Default: True)_
* **Translate Boolean** (optional) - _Specifies how Boolean objects are interpreted when setting the value for a character field/parameter. Setting the property to "false", would store the Boolean object in the character field as either "1" or "0 (Default: False)"_

## Compatibility

Developed and tested on n8n v1.14.2. I did not test any previous version, so if you feel like trying and reporting back I will update this README.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [node-jt400 npm page](https://www.npmjs.com/package/node-jt400)
* [IBM Toolbox JDBC properties](https://www.ibm.com/docs/en/i/7.5?topic=ssw_ibm_i_75/rzahh/javadoc/com/ibm/as400/access/doc-files/JDBCProperties.htm)




