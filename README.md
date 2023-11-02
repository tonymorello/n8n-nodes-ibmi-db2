# n8n-nodes-ibmi-db2

This is an n8n community node. It lets you query a DB2 instance running on iSeries (AS400) in your n8n workflows.

I created this node for internal use and used [GeorgeJeffcock/n8n](https://github.com/GeorgeJeffcock/n8n) repo for reference as I was learning how to write custom nodes.  
It uses node-jt400 to establish a TCP/IP connection to the database and runs a query returning the results as data that can be used in n8n.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history)  <!-- delete if not using this section -->

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

Currently this node allows you to execute raw queries on a DB2 instance running on iSeries (or AS400).   
I might add more operations if needed.

## Credentials

The node supports the following credentials/settings:
* **Host** - _TCP/IP host name/address of the database server_
* **User** - _User name for connecting to the database_
* **Password** - _Password for connecting to the database_
* **Database** (optional) - _Default database/schema_
* **Libraries** (optional) - _Specifies one or more libraries that you want to add/replace in the library list_
* **Port** (optional) - _Connection port_

## Compatibility

Developed and tested on n8n v1.14.2. I did not test any previous version, so if you feel like trying and reporting back I will update this README.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [node-jt400 npm page](https://www.npmjs.com/package/node-jt400)
* [IBM Toolbox JDBC properties](https://www.ibm.com/docs/en/i/7.5?topic=ssw_ibm_i_75/rzahh/javadoc/com/ibm/as400/access/doc-files/JDBCProperties.htm)




